"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "../../components/icons";
import { authClient } from "../../lib/auth/client";
import "../Admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch {
      setError("Unable to connect to authentication service");
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <Link href="/" className="admin-login-logo" aria-label="Home">
            <Icon name="temple" />
          </Link>
          <h2>Shree Property Kashi</h2>
          <p className="admin-login-tagline" lang="hi">
            आप का विश्वास ही, मेरी पहचान हैं
          </p>
        </div>

        <div className="admin-login-header">
          <h1>Admin Portal</h1>
          <p>Sign in with your administrator credentials</p>
        </div>

        {error && (
          <div className="admin-login-error" role="alert">
            <span>{error}</span>
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label htmlFor="admin-email">Email Address</label>
            <div className="admin-login-input-wrap">
              <Icon name="user" />
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@shreepropertykashi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-login-input-wrap">
              <Icon name="key" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                className="admin-login-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>

        <div className="admin-login-footer">
          <Link href="/" className="admin-login-back">
            <Icon name="back" />
            <span>Return to public website</span>
          </Link>
        </div>

        <Image
          className="admin-login-art"
          src="/images/varanasi-riverfront-footer.webp"
          alt=""
          width={2172}
          height={724}
        />
      </div>
    </div>
  );
}
