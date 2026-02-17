import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "SERVICES", path: "/#services" },
  { label: "PROJECTS", path: "/#projects" },
  { label: "CAREERS", path: "/careers" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClick = (path: string) => {
    setOpen(false);
    if (path.startsWith("/#")) {
      const id = path.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = path;
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-primary-foreground">
              DM ENTERPRISE
            </span>
            <span className="text-xs font-medium tracking-[0.25em] text-secondary">
              CONSULTING
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.path.startsWith("/#") ? (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary",
                  location.pathname === item.path && "text-secondary"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="text-primary-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-primary-foreground/10 bg-primary md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) =>
              item.path.startsWith("/#") ? (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.path)}
                  className="text-left text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary",
                    location.pathname === item.path && "text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
