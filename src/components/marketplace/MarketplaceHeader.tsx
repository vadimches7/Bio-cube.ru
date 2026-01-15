import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MarketplaceHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/brand/biocube-logo.png"
              alt="BioCube"
              className="h-12 object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск по биомам, рыбам, оборудованию..."
                className="pl-10 bg-white/10 border-white/20 backdrop-blur-sm focus:bg-white/20 transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#4DB6AC] text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
            <Button className="bg-[#4DB6AC] hover:bg-[#45a399] text-white px-6">
              <User className="w-4 h-4 mr-2" />
              Мой BioCube OS
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
