import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Home,
  List,
  ShoppingCart,
  Calendar,
  User,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

const items: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Recipes",
    href: "/recipes",
    icon: <ChefHat className="h-4 w-4" />,
  },
  {
    title: "Shopping List",
    href: "/shopping-list",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Meal Planner",
    href: "/meal-planner",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <User className="h-4 w-4" />,
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {item.icon}
          <span className="hidden md:inline">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}