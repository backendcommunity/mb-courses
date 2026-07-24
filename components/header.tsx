"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "https://courses.masteringbackend.com", label: "Learn" },
  { href: "https://projects.masteringbackend.com/", label: "Build" },
  { href: "https://masteringbackend.com/interviews", label: "Grow" },
  { href: "https://blog.masteringbackend.com/", label: "Blog" },
  { href: "https://masteringbackend.com/community", label: "Community" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-20 container mx-auto px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <a href="https://masteringbackend.com?ref=learn" className="flex items-center gap-2">
          <img
            src="/masteringbackend_logo.png"
            alt="MasteringBackend"
            className="h-8 md:h-28 w-auto object-contain"
          />
        </a>
      </div>
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-6">
        <Link
          href="https://app.masteringbackend.com/auth/login"
          className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Login
        </Link>
        <Button
          variant="outline"
          className="hidden sm:inline-flex rounded-full border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white px-6 h-10"
          asChild
        >
          <Link href="https://app.masteringbackend.com?ref=course-homepage">
            Get started
          </Link>
        </Button>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-slate-600 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border border-white/10 bg-[#0B152A] shadow-2xl p-6 flex flex-col items-center gap-1 text-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 text-base font-medium text-slate-200 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://app.masteringbackend.com/auth/login"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3 text-base font-medium text-slate-200 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="https://app.masteringbackend.com?ref=course-homepage"
            onClick={() => setMobileOpen(false)}
            className="mt-3 w-full text-center px-6 py-3 rounded-full bg-[#13AECE] text-white font-semibold"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
