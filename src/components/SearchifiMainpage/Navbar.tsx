import { useState, useEffect } from "react";
import { Command, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ShareProjectButton from "../Sharedproject";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => navigate("/login");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/components" },
    { name: "Contact Us", href: "/APItesterfile" },
    { name: "Our Community", href: "/projects" },
  ];

  return (
    <header
      className={`fixed top-3.5 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 rounded-full
        ${isScrolled
          ? "h-14 bg-[#1B1B1B]/40 backdrop-blur-xl border-white/10 scale-95 w-[95%] max-w-6xl"
          : "h-14 bg-[#1B1B1B] w-[90%] max-w-5xl"}`}
    >
      <div className="mx-auto h-full px-4 sm:px-6">
        <nav className="flex items-center justify-between h-full w-full max-w-7xl mx-auto">
          {/* Left - Logo */}
          <div className="flex items-center justify-start w-1/3 max-md:w-auto">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Command className="w-5 h-5 text-violet-600" />
              <span className="font-bold text-base whitespace-nowrap text-white">TheSearchifi</span>
            </Link>
          </div>

          {/* Center - Nav Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-5 justify-center w-1/3 max-lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-muted-foreground hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right - Auth Actions (desktop only) */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/3 max-lg:hidden">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="rounded-full w-9 h-9 bg-gradient-to-b from-violet-600 to-violet-950 text-white flex items-center justify-center text-sm font-semibold uppercase hover:scale-105 transition-transform cursor-pointer">
                    {user.email?.charAt(0)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1B1B1B] border border-white/10 mt-2">
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer text-sm text-muted-foreground hover:text-white"
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-sm text-muted-foreground hover:text-white"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleSignIn}
                size="sm"
                className="h-9 rounded-full px-4 bg-gradient-to-b from-violet-600 to-violet-950 text-white hover:opacity-70 transform transition-all duration-150 hover:scale-95"
              >
                Sign Up
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="glass border-white/10 text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#1B1B1B] text-white w-[85%] max-w-sm">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-lg text-muted-foreground hover:text-white transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-lg text-muted-foreground hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        variant="ghost"
                        className="justify-start text-lg text-muted-foreground hover:text-white"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleSignIn();
                      }}
                      className="button-gradient text-white bg-gradient-to-b from-violet-600 to-violet-950"
                    >
                      Sign In
                    </Button>
                  )}

                  <ShareProjectButton className="w-full" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
