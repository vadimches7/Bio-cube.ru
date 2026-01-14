import { Shield, Heart, Clock } from "lucide-react";

export function TrustBar() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-[#4DB6AC]/5 via-[#26A69A]/5 to-[#4DB6AC]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Insurance Badge */}
          <div className="flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#4DB6AC]/25">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Страховка 1 млн ₽</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Сухой пол — защита от протечек</p>
            </div>
          </div>

          {/* Living Guarantee Badge */}
          <div className="flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#4DB6AC]/25">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">Гарантия 100%</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Живой плавник — здоровье обитателей</p>
            </div>
          </div>

          {/* SLA Badge */}
          <div className="flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#4DB6AC]/25">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">SLA 15 минут</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Мгновенная реакция на проблемы</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
