"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Lightbulb,
  Video,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  User2Icon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Content Ideas", path: "/ideas", icon: Lightbulb },
  { title: "Video Production", path: "/production", icon: Video },
  { title: "Upload Calendar", path: "/calendar", icon: Calendar },
  { title: "Users", path: "/users", icon: User2Icon },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("theme") === "dark";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newDark);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sidebar-foreground">
              CreatorCMS
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Content Workflow
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border mt-auto flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary transition"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <>
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Dark</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
