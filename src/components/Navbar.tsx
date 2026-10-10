"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  X,
  Heart,
  Home,
  Flame,
  Clapperboard,
  CalendarDays,
  Menu,
} from "lucide-react";

import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();

  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Movies",
      href: "/movies",
      icon: Clapperboard,
    },
    {
      name: "Now Playing",
      href: "/now-playing",
      icon: Flame,
    },
    {
      name: "Upcoming",
      href: "/upcoming",
      icon: CalendarDays,
    },
  ];

  // ================= CLOSE SIDEBAR =================

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/30 text-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-2xl">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Link
            href="/"
            onClick={closeSidebar}
            className="flex shrink-0 items-center gap-2"
          >
            {/* Logo Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20 transition hover:bg-red-700">
              <Clapperboard
                size={21}
                className="text-white"
              />
            </div>

            {/* Logo Text - Hidden on mobile */}
            <span className="hidden text-xl font-bold sm:block">
              <span className="text-red-500">
                Movie
              </span>{" "}
              <span className="text-white">
                Explorer
              </span>
            </span>
          </Link>

          {/* ================================================= */}
          {/* DESKTOP NAV LINKS */}
          {/* ================================================= */}

          <div className="ml-8 hidden flex-1 items-center justify-center gap-1 md:flex">

            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-red-500/15 text-red-400"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={17} />

                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* ================================================= */}
          {/* DESKTOP ACTIONS */}
          {/* ================================================= */}

          <div className="ml-auto hidden items-center gap-2 md:flex">

            {/* ================= FAVORITES ================= */}

            <Link
              href="/favorites"
              className={`relative rounded-xl p-2.5 transition-all duration-200 ${
                pathname === "/favorites"
                  ? "bg-red-500/15 text-red-400"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Favorites"
            >
              <Heart
                size={20}
                className={
                  pathname === "/favorites"
                    ? "fill-red-500"
                    : ""
                }
              />

              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-lg">
                  {favorites.length}
                </span>
              )}
            </Link>

          </div>

          {/* ================================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="ml-auto rounded-xl p-2 text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* ================================================= */}
      {/* MOBILE SIDEBAR */}
      {/* ================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        >

          <aside
            onClick={(e) => e.stopPropagation()}
            className="h-full w-72 border-r border-white/10 bg-black/60 shadow-2xl backdrop-blur-2xl"
          >

            {/* ================================================= */}
            {/* SIDEBAR HEADER */}
            {/* ================================================= */}

            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">

              <Link
                href="/"
                onClick={closeSidebar}
                className="flex items-center gap-2"
              >

                {/* Logo */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
                  <Clapperboard
                    size={21}
                    className="text-white"
                  />
                </div>

                {/* Logo Text */}
                <span className="text-lg font-bold">
                  <span className="text-red-500">
                    Movie
                  </span>{" "}
                  <span className="text-white">
                    Explorer
                  </span>
                </span>

              </Link>

              {/* Close */}
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-xl p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

            </div>

            {/* ================================================= */}
            {/* SIDEBAR CONTENT */}
            {/* ================================================= */}

            <div className="p-4">

              {/* ================= NAVIGATION ================= */}

              {navItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-red-500/15 text-red-400"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >

                    <Icon size={19} />

                    {item.name}

                  </Link>
                );
              })}

              {/* ================= FAVORITES ================= */}

              <Link
                href="/favorites"
                onClick={closeSidebar}
                className={`mb-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                  pathname === "/favorites"
                    ? "bg-red-500/15 text-red-400"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >

                <span className="flex items-center gap-3">

                  <Heart
                    size={19}
                    className={
                      pathname === "/favorites"
                        ? "fill-red-500"
                        : ""
                    }
                  />

                  Favorites

                </span>

                {favorites.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {favorites.length}
                  </span>
                )}

              </Link>

            </div>

          </aside>

        </div>
      )}
    </>
  );
}