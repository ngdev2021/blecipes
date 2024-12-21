import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map route to readable names
  const getReadableName = (path: string, params: { [key: string]: string }) => {
    if (path === "recipes") return "Recipes";
    if (path === "recipe") {
      if (params.id) return "Recipe Details";
      return "New Recipe";
    }
    if (path === "shopping-list") return "Shopping List";
    if (path === "meal-planner") return "Meal Planner";
    if (path === "profile") return "Profile";
    return path;
  };

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const params = location.pathname.match(/\d+/)
            ? { id: location.pathname.match(/\d+/)![0] }
            : {};

          if (isLast) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{getReadableName(path, params)}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link to={routeTo}>{getReadableName(path, params)}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}