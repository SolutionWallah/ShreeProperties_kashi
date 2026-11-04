import "server-only";
import dns from "node:dns";
import { createNeonAuth } from "@neon/auth/next/server";

const originalLookup = dns.lookup;
(dns as any).lookup = (hostname: string, options: any, callback: any) => {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  originalLookup(hostname, options, (err: any, address: any, family: any) => {
    if (err && err.code === "ENOTFOUND") {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      dns.resolve4(hostname, (resErr: any, addrs: string[]) => {
        if (!resErr && addrs && addrs.length > 0) {
          if (options && options.all) {
            return callback(null, addrs.map((a) => ({ address: a, family: 4 })));
          }
          return callback(null, addrs[0], 4);
        }
        return callback(err);
      });
    } else {
      return callback(err, address, family);
    }
  });
};

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const secret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is not configured");
}

if (!secret || secret.length < 32) {
  throw new Error("NEON_AUTH_COOKIE_SECRET must be at least 32 characters long");
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret,
  },
});

export async function getAdminSession() {
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session?.user) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, user: session.user };
}
