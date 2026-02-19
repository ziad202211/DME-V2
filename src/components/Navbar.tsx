import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/5">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-primary-foreground transition-colors group-hover:text-secondary">
              DM ENTERPRISE
            </span>
            <span className="text-xs font-medium tracking-[0.15em] sm:tracking-[0.25em] text-secondary">
              CONSULTING
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 lg:gap-8 md:flex">
          {navItems.map((item) =>
            item.path.startsWith("/#") ? (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="relative text-xs lg:text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "relative text-xs lg:text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full",
                  location.pathname === item.path ? "text-secondary after:w-full" : "after:w-0"
                )}
              >
                {item.label}
              </Link>
            )
          )}
          
          {/* More dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative text-xs lg:text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
              MORE
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary border-primary-foreground/20 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
              <DropdownMenuItem className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 cursor-pointer">
                <Link to="/contact" className="w-full">
                  Location & Contact
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 cursor-pointer">
                <Link to="/book" className="w-full">
                  Book Online
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10 cursor-pointer">
                <Link to="/clients" className="w-full">
                  Clients
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-primary-foreground md:hidden p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-primary-foreground/10 bg-primary md:hidden">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-3 sm:gap-4">
            {navItems.map((item) =>
              item.path.startsWith("/#") ? (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.path)}
                  className="text-left text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary py-1"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-semibold tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary py-1",
                    location.pathname === item.path && "text-secondary"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
            
            {/* Mobile More menu items */}
            <div className="border-t border-primary-foreground/10 pt-3 sm:pt-4">
              <div className="text-sm font-semibold tracking-wider text-primary-foreground/60 mb-2">MORE</div>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary py-2"
              >
                Location & Contact
              </Link>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary py-2"
              >
                Book Online
              </Link>
              <Link
                to="/clients"
                onClick={() => setOpen(false)}
                className="block text-sm font-medium tracking-wider text-primary-foreground/80 transition-colors hover:text-secondary py-2"
              >
                Clients
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
