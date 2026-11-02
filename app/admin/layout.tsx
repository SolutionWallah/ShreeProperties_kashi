"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon } from "../components/icons";

/** Provides the shared admin navigation and page header for property management routes. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const adding = pathname.endsWith("/new");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin/properties" aria-label="Shree Property Kashi admin home">
          <Icon name="temple" /><span>Shree<br />Property Kashi</span>
        </Link>
        <nav className="admin-navigation" aria-label="Admin navigation">
          <Link className={!adding ? "is-active" : ""} href="/admin/properties"><Icon name="home" />Properties</Link>
          <Link className={adding ? "is-active" : ""} href="/admin/properties/new"><Icon name="plus" />Add Property</Link>
          <Link className="admin-logout" href="/"><Icon name="logout" />Logout</Link>
        </nav>
        <Image className="admin-sidebar-art" src="/images/varanasi-riverfront-footer.webp" alt="" width={2172} height={724} />
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-title-wrap">
            {adding && <Link className="admin-back" href="/admin/properties" aria-label="Back to properties"><Icon name="back" /></Link>}
            <div><h1>{adding ? "Add Property" : "Property Management"}</h1><p>{adding ? "Add a new property listing to your website." : "Manage your property listings, update status, or add new properties."}</p></div>
          </div>
          <Image className="admin-top-art" src="/images/varanasi-riverfront-footer.webp" alt="" width={2172} height={724} />
          <div className="admin-profile"><span><Icon name="user" /></span><div><strong>Ashutosh Singh</strong><small>(Admin)</small></div><Icon name="chevron" /></div>
        </header>
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
