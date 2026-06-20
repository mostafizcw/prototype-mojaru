"use client";

import { useState, useRef, useEffect } from "react";
import logo from "@/assets/mojaru-logo.png";
import Link from "next/link";
import Image from "next/image";

// ── Types ──────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: { label: string; href: string }[];
}

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  {
    label: "Courses",
    href: "#",
    hasDropdown: true,
    children: [
      { label: "Math", href: "#" },
      { label: "English", href: "#" },
      { label: "Science", href: "#" },
      { label: "Chinese", href: "#" },
    ],
  },
  { label: "Why WuKong", href: "#" },
  { label: "Wall of love", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Download", href: "#" },
];

// ── Sub‑components ─────────────────────────────────────────────────────────

/** Animated Mojaru logo */
function MojaruLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 text-white"
      aria-label="Mojaru home"
    >
      <span className="text-lg font-bold tracking-tight sm:text-xl">
        Mojaru
      </span>
    </Link>
  );
}

/** Single nav link, with optional dropdown */
function NavLink({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!item.hasDropdown) {
    return (
      <Link
        href={item.href}
        className="relative text-sm font-medium text-white transition-colors duration-200 hover:text-[#e83a5d] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#e83a5d] after:transition-all after:duration-300 hover:after:w-full"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-white transition-colors duration-200 hover:text-[#e83a5d]"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        {/* Chevron */}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute left-1/2 top-full z-50 mt-3 min-w-[160px] -translate-x-1/2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {/* Small arrow */}
        <div className="mx-auto mb-1 h-2.5 w-5 overflow-hidden">
          <div
            className="mx-auto h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-white shadow-md"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          />
        </div>
        <div
          className="overflow-hidden rounded-2xl bg-white py-2 shadow-xl"
          style={{ border: "1px solid rgba(0,0,0,0.07)" }}
        >
          {item.children?.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-rose-50 hover:text-[#e83a5d]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Globe icon */
function GlobeIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

/** Mobile hamburger */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${
          open ? "top-2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-2 h-0.5 w-full rounded bg-current transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${
          open ? "top-2 -rotate-45" : "top-4"
        }`}
      />
    </div>
  );
}

// ── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Shadow on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-3 z-50 mx-auto mt-3 w-[calc(100%-1rem)] max-w-7xl rounded-2xl bg-brand-purple transition-shadow duration-300 sm:top-4 sm:mt-6 sm:w-[calc(100%-2rem)] sm:rounded-full ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      // style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
    >
      {/* ── Desktop bar ── */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-[68px] sm:px-6 lg:px-10">
        {/* Logo */}
        <MojaruLogo />

        {/* Nav links – hidden on mobile */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language selector */}
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white">
            <GlobeIcon />
            <span>English</span>
          </button>

          {/* Login */}
          <Link
            href="#"
            className="rounded-full border border-white/35 px-5 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
          >
            Log in
          </Link>

          {/* CTA */}
          <Link
            href="#"
            className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 75%, #f97316 100%)",
              boxShadow: "0 4px 15px 0 rgba(168, 85, 247, 0.35)",
            }}
          >
            {/* Shimmer layer */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-700 hover:translate-x-full"
              aria-hidden="true"
            />
            Try now!
          </Link>
        </div>

        {/* Hamburger – mobile only */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`overflow-hidden rounded-b-2xl bg-brand-purple transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          borderTop: mobileOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="flex flex-col gap-1 px-4 pb-5 pt-2 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="grid gap-1 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          <div className="mt-3 flex flex-col gap-2">
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white">
              <GlobeIcon />
              English
            </button>
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="rounded-full border border-white/35 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Log in
            </Link>
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="rounded-full py-2.5 text-center text-sm font-bold text-white"
            >
              Get Learning Plan
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
