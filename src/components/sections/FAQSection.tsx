import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Сколько стоит аквариум под ключ?",
    answer: "Стоимость зависит от размера, типа (пресноводный/морской), оборудования и сложности установки. Пресноводный аквариум от 200 литров — от 150 000 ₽. Морской риф — от 350 000 ₽. Точную стоимость рассчитаем после консультации.",
  },
  {
    question: "Как долго запускается аквариум?",
    answer: "Полный цикл от заказа до заселения рыб занимает 4-8 недель. Изготовление — 2-4 недели, установка — 1-3 дня, созревание воды — 2-4 недели. Для морских систем срок может быть больше.",
  },
  {
    question: "Что входит в обслуживание?",
    answer: "Регулярное обслуживание включает: подмену воды, чистку стёкол и фильтров, тестирование параметров, кормление (при необходимости), консультации. Частота — от 1 до 4 раз в месяц в зависимости от системы.",
  },
  {
    question: "Выезжаете ли вы за пределы Москвы?",
    answer: "Да, работаем по всей Московской области и готовы выехать в другие регионы. Для удалённых объектов обсуждаем логистику индивидуально.",
  },
  {
    question: "Можно ли перевезти существующий аквариум?",
    answer: "Да, выполняем профессиональный переезд аквариумов любого размера. Включает: слив воды, упаковку обитателей, демонтаж, транспортировку, монтаж на новом месте, перезапуск.",
  },
  {
    question: "Что делать, если рыбы болеют?",
    answer: "Позвоните нам — выезжаем на диагностику в течение 24 часов (в экстренных случаях — 4 часа). Определим причину, назначим лечение, при необходимости заберём рыб на карантин.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bio/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Частые{" "}
            <span className="text-gradient-bio">вопросы</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответы на популярные вопросы наших клиентов
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-premium px-6 border-none"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:text-bio hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
