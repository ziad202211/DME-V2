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
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/#services", isDropdown: true },
  { label: "Projects", path: "/#projects" },
];

const serviceItems = [
  { label: "Program Management", path: "/services/program-management" },
  { label: "Construction Management", path: "/services/construction-management" },
  { label: "IT Solutions", path: "/services/it-solutions" },
  { label: "Project Controls", path: "/services/project-controls" },
  { label: "Geospatial Technologies", path: "/services/geospatial-technologies" },
  { label: "Utility Engineering", path: "/services/utility-engineering" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-5 sm:py-6 relative">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group absolute left-4 sm:left-6">
          <img 
            src="/images/logo.png" 
            alt="DM Enterprise Consulting" 
            className="h-6 sm:h-6 w-auto"
          />
        </Link>

        {/* Desktop nav - centered */}
        <div className="hidden items-center gap-4 lg:gap-8 md:flex mx-auto">
          {navItems.map((item) =>
            item.isDropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="relative text-sm lg:text-sm font-normal text-gray-700/80 hover:text-[#190ab0] flex items-center gap-1">
                  {item.label}
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white border border-gray-200 shadow-lg">
                  {serviceItems.map((service) => (
                    <DropdownMenuItem key={service.path} asChild className="focus:bg-transparent focus:text-[#190ab0]">
                      <Link
                        to={service.path}
                        className="text-sm text-gray-700 hover:text-[#190ab0] w-full px-2 py-2"
                      >
                        {service.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.path.startsWith("/#") ? (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className="relative text-sm lg:text-sm font-normal text-gray-700/80 hover:text-[#190ab0]"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "relative text-sm lg:text-sm font-normal text-gray-700/80 hover:text-[#190ab0]",
                  location.pathname === item.path ? "text-[#190ab0]" : ""
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Contact Us button - positioned on the right */}
        <Link
          to="/contact"
          className="hidden md:flex px-6 py-2 text-sm font-normal text-white bg-[#190ab0] rounded-full hover:bg-[#150d8d] absolute right-4 sm:right-6"
        >
          CONTACT US
        </Link>

        {/* Mobile toggle - positioned on the right */}
        <button
          className="text-gray-700 md:hidden p-1 absolute right-4 sm:right-6"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-gray-200/50 bg-white/80 md:hidden">
          <div className="flex flex-col px-4 sm:px-6 py-4 gap-3 sm:gap-4">
            {navItems.map((item) =>
              item.isDropdown ? (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="text-sm font-semibold tracking-wider text-gray-700/80 py-1">
                    {item.label}
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    {serviceItems.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setOpen(false)}
                        className="text-sm font-normal tracking-wider text-gray-600/80 hover:text-[#190ab0] py-1"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.path.startsWith("/#") ? (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.path)}
                  className="text-left text-sm font-semibold tracking-wider text-gray-700/80 hover:text-[#190ab0] py-1"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-sm font-semibold tracking-wider text-gray-700/80 hover:text-[#190ab0] py-1",
                    location.pathname === item.path && "text-[#190ab0]"
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
