import { Button } from "@/components/ui/button";
import { FileText, Shield } from "lucide-react";
import { useState } from "react";

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Handle form submission
    console.log("Form submitted:", { name, phone });
    
    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setPhone("");
    }, 1000);
  };

  return (
    <section id="lead-form" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="relative">
          {/* Document-style background effect */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl transform -rotate-1"></div>

          {/* Main form container */}
          <div className="relative bg-gradient-to-br from-white via-[#4DB6AC]/5 to-[#26A69A]/5 rounded-3xl shadow-2xl border-2 border-[#4DB6AC]/20 p-12">
            {/* Official stamp effect */}
            <div className="absolute top-8 right-8 opacity-10">
              <Shield className="w-32 h-32 text-[#4DB6AC]" />
            </div>

            {/* Header */}
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-[#4DB6AC]" />
                <span className="text-sm font-medium text-[#4DB6AC] uppercase tracking-wider">Официальный документ</span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Ваша экосистема готова к запуску</h2>
              <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
                Оставьте контакт, и мы вышлем детальный PDF-паспорт вашего будущего аквариума со сметой и планом
                здоровья
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    required
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl 
                             focus:border-[#4DB6AC] focus:ring-4 focus:ring-[#4DB6AC]/10 
                             transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl 
                             focus:border-[#4DB6AC] focus:ring-4 focus:ring-[#4DB6AC]/10 
                             transition-all outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#4DB6AC] to-[#26A69A] hover:from-[#45a399] 
                         hover:to-[#1e8a82] text-white py-6 rounded-2xl text-lg font-medium 
                         shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Отправка..." : "Получить паспорт проекта"}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>

            {/* Trust indicators */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>100% бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>Без спама</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>Ответ в течение часа</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
