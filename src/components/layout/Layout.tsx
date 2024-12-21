import { MainNav } from "./MainNav";
import { Breadcrumbs } from "./Breadcrumbs";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center px-4">
          <MainNav />
        </div>
      </header>
      <main className="container px-4 py-8">
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}