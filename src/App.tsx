import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AllRecipes from "./pages/AllRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import AddEditRecipe from "./pages/AddEditRecipe";
import Profile from "./pages/Profile";
import ShoppingList from "./pages/ShoppingList";
import MealPlanner from "./pages/MealPlanner";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AllRecipes />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <RecipeDetail />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/new"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AddEditRecipe />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/edit/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AddEditRecipe />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping-list"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ShoppingList />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/meal-planner"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MealPlanner />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;