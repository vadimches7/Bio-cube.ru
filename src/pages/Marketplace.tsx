import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";
import { BiohackingSets } from "@/components/marketplace/BiohackingSets";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <MarketplaceNav />
        <BiohackingSets />
      </main>
    </div>
  );
}
