"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "../components/icons";
import { authClient } from "../lib/auth/client";
import "./Admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const adding = pathname.endsWith("/new");

  const [loading, setLoading] = useState(!isLoginPage);
  const [userName, setUserName] = useState("Ashutosh Singh");

  useEffect(() => {
    if (isLoginPage) return;

    let mounted = true;

    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/get-session", {
          credentials: "include",
        });

        if (!response.ok) {
          if (mounted) router.replace("/admin/login");
          return;
        }

        const data = await response.json();

        if (!data || !data.user) {
          if (mounted) router.replace("/admin/login");
          return;
        }

        if (mounted) {
          if (data.user.name) setUserName(data.user.name);
          setLoading(false);
        }
      } catch {
        if (mounted) router.replace("/admin/login");
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [isLoginPage, router]);

  async function handleLogout(event: React.MouseEvent) {
    event.preventDefault();
    try {
      await authClient.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-login-shell">
        <div style={{ textAlign: "center", color: "var(--color-muted)", fontWeight: 600 }}>
          Verifying administrator credentials...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link
          className="admin-brand"
          href="/admin/properties"
          aria-label="Shree Property Kashi admin home"
        >
          <Icon name="temple" />
          <span>
            Shree
            <br />
            Property Kashi
          </span>
        </Link>
        <nav className="admin-navigation" aria-label="Admin navigation">
          <Link className={!adding ? "is-active" : ""} href="/admin/properties">
            <Icon name="home" />
            Properties
          </Link>
          <Link className={adding ? "is-active" : ""} href="/admin/properties/new">
            <Icon name="plus" />
            Add Property
          </Link>
          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              font: "inherit",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Icon name="logout" />
            Logout
          </button>
        </nav>
        <Image
          className="admin-sidebar-art"
          src="/images/varanasi-riverfront-footer.webp"
          alt=""
          width={2172}
          height={724}
        />
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-title-wrap">
            {adding && (
              <Link className="admin-back" href="/admin/properties" aria-label="Back to properties">
                <Icon name="back" />
              </Link>
            )}
            <div>
              <h1>{adding ? "Add Property" : "Property Management"}</h1>
              <p>
                {adding
                  ? "Add a new property listing to your website."
                  : "Manage your property listings, update status, or add new properties."}
              </p>
            </div>
          </div>
          <Image
            className="admin-top-art"
            src="/images/varanasi-riverfront-footer.webp"
            alt=""
            width={2172}
            height={724}
          />
          <div className="admin-profile">
            <span>
              <Icon name="user" />
            </span>
            <div>
              <strong>{userName}</strong>
              <small>(Admin)</small>
            </div>
            <Icon name="chevron" />
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
