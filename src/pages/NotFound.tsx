import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container relative z-10 px-4">
        <div className="max-w-xl mx-auto text-center card-premium p-8 md:p-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-3">404</h1>
          <p className="text-muted-foreground mb-8">Страница не найдена</p>
          <a href="/" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-bio text-primary-foreground font-semibold hover:scale-105 transition-all">
            На главную
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
