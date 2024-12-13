import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-playfair text-center mb-8 text-charcoal">
          Welcome to Recipe Mingle
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#8A9A5B", // sage green
                  brandAccent: "#A4B573",
                },
              },
            },
            style: {
              button: {
                borderRadius: "6px",
                height: "40px",
              },
              input: {
                borderRadius: "6px",
              },
              anchor: {
                color: "#8A9A5B",
              },
            },
          }}
          theme="light"
          providers={["google", "github"]}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Login;