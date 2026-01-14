import { Check, X } from "lucide-react";

export function ComparisonTable() {
  const features = [
    "Гарантия на живых рыб",
    "Фиксированная цена",
    "Цифровые отчеты в приложении",
    "Страховка квартиры от протечек",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-light text-center mb-16 text-gray-900">BioCube vs Обычный магазин</h2>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-[#4DB6AC]/10 to-[#26A69A]/10 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-600"></div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4DB6AC] to-[#26A69A] mb-2">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.5 3.8 9.7 9 11 5.2-1.3 9-5.5 9-11V7l-10-5z" />
                </svg>
              </div>
              <div className="font-semibold text-gray-900">BioCube</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-200 mb-2">
                <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
                </svg>
              </div>
              <div className="font-semibold text-gray-500">Обычный магазин</div>
            </div>
          </div>

          {/* Features comparison */}
          <div className="divide-y divide-gray-100">
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-6 hover:bg-gray-50 transition-colors">
                <div className="text-gray-700 font-medium">{feature}</div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
                    <Check className="w-6 h-6 text-emerald-600" strokeWidth={3} />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                    <X className="w-6 h-6 text-gray-400" strokeWidth={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
