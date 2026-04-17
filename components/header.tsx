import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <a href="https://masteringbackend.com?ref=learn" className="flex items-center gap-2">
          <img
            src="/masteringbackend_logo.png"
            alt="MasteringBackend"
            className="md:h-28 w-auto object-contain"
          />
        </a>
      </div>
      <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link
          href="https://courses.masteringbackend.com"
          className="hover:text-white transition-colors"
        >
          Learn
        </Link>
        <Link
          href="https://projects.masteringbackend.com/"
          className="hover:text-white transition-colors"
        >
          Build
        </Link>
        <Link
          href="https://masteringbackend.com/interviews"
          className="hover:text-white transition-colors"
        >
          Grow
        </Link>
        <Link
          href="https://blog.masteringbackend.com/"
          className="hover:text-white transition-colors"
        >
          Blog
        </Link>
        <Link
          href="https://masteringbackend.com/community"
          className="hover:text-white transition-colors"
        >
          Community
        </Link>
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
          className="rounded-full border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white px-6 h-10"
          asChild
        >
          <Link href="https://app.masteringbackend.com?ref=course-homepage">
            Get started
          </Link>
        </Button>
      </div>
    </header>
  );
}
