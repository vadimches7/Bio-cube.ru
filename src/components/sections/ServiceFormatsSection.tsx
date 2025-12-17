import { useState } from "react";
import { useServiceMode } from "@/contexts/ServiceModeContext";
import { Button } from "@/components/ui/button";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Stethoscope, 
  Wrench, 
  Crown, 
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  Zap
} from "lucide-react";

/**
 * ServiceFormatsSection - Секция форматов обслуживания
 * 
 * Показывается ТОЛЬКО в режиме service.
 * Три формата:
 * 1. Диагностика + план стабилизации
 * 2. Разовый сервисный визит
 * 3. Абонентское обслуживание (премиум)
 */

const serviceFormats = [
  {
    id: "diagnostic",
    icon: Stethoscope,
    title: "Диагностика",
    subtitle: "План стабилизации",
    description:
      "Если непонятно, почему “всё ломается” — начнём с диагностики. Объясним причину простыми словами и дадим план, что делать дальше.",
    who: "когда нужно понять причину и не делать лишнего.",
    result: "понятный план стабилизации + рекомендации по уходу.",
    price: "от 5 200 ₽",
    features: [
      "Расширенный анализ воды",
      "Осмотр оборудования",
      "План стабилизации",
      "Рекомендации по уходу",
    ],
    badgeIcon: Clock,
    badgeText: "1-2 часа",
    popular: false,
  },
  {
    id: "single",
    icon: Wrench,
    title: "Сервисный визит",
    subtitle: "Разовая помощь",
    description:
      "Нужно привести в порядок “здесь и сейчас”. Чистка, подмена, настройка, лечение — по ситуации и без сюрпризов.",
    who: "когда надо быстро вернуть порядок и стабильность.",
    result: "чисто, настроено, понятно что делать дальше.",
    price: "от 3 900 ₽",
    features: [
      "Глубокая чистка",
      "Подмена воды (по ситуации)",
      "Обслуживание фильтров",
      "Настройка оборудования",
      "Лечение при необходимости",
    ],
    badge: "Популярно",
    badgeIcon: Clock,
    badgeText: "2-4 часа",
    popular: true,
  },
  {
    id: "subscription",
    icon: Crown,
    title: "Абонемент",
    subtitle: "Премиум кураторство",
    description:
      "Еженедельный визит + кураторство. Вы не думаете про обслуживание — мы ведём аквариум и держим систему в стабильном состоянии.",
    who: "если хотите вообще не думать об обслуживании.",
    result: "стабильный аквариум без авралов и “внезапных проблем”.",
    price: "от 7 000 ₽/мес",
    features: [
      "Рекомендуемо: 4 визита в месяц",
      "Персональный куратор",
      "Поддержка в мессенджерах",
      "Плановый контроль параметров",
      "Экстренный выезд (в критических случаях)",
    ],
    badge: "VIP",
    badgeIcon: Calendar,
    badgeText: "2–4 визита/мес",
    popular: false,
  },
];

export function ServiceFormatsSection() {
  const { mode } = useServiceMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [prefillComment, setPrefillComment] = useState<string | undefined>(undefined);

  // Показываем только в режиме service
  if (mode !== "service") return null;

  const handleSelectFormat = (formatId: string, formatTitle: string) => {
    setSelectedFormat(formatTitle);
    const mapping: Record<string, string> = {
      diagnostic: "Хочу диагностику и план стабилизации. Опишите, что происходит с аквариумом.",
      single: "Нужен разовый сервисный визит. Опишите проблему и примерный объём аквариума.",
      subscription: "Интересует абонемент/кураторство (2–4 визита/мес). Опишите аквариум и текущие проблемы (если есть).",
    };
    setPrefillComment(mapping[formatId]);
    setDialogOpen(true);
  };

  return (
    <section id="service-formats" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber/3 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-amber mb-4">Форматы работы</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Выберите{" "}
            <span className="text-gradient-amber">подходящий формат</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            От разовой диагностики до кураторства. Без лишних работ и “химии наугад”.
          </p>
        </div>
        
        {/* Format Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {serviceFormats.map((format) => (
            <div
              key={format.id}
              className={cn(
                "card-premium p-6 md:p-8 flex flex-col relative",
                format.popular && "ring-2 ring-amber/50"
              )}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
            >
              {/* Popular badge */}
              {format.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-amber text-primary-foreground text-xs font-medium">
                  {format.badge}
                </div>
              )}
              
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                format.popular 
                  ? "bg-gradient-amber text-primary-foreground" 
                  : "bg-amber/10 text-amber"
              )}>
                <format.icon className="w-7 h-7" />
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-2xl font-bold mb-1">{format.title}</h3>
              <p className="text-amber text-sm font-medium mb-4">{format.subtitle}</p>

              {/* Price */}
              {"price" in format && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/40 text-xs text-muted-foreground">
                    {format.price}
                  </span>
                </div>
              )}
              
              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {format.description}
              </p>

              {/* Кому подходит / Результат */}
              <div className="space-y-2 mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Кому подходит:</span> {format.who}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Результат:</span> {format.result}
                </p>
              </div>
              
              {/* Features */}
              <ul className="space-y-2 mb-6">
                {format.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Time badge */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                <format.badgeIcon className="w-4 h-4" />
                <span>{format.badgeText}</span>
                {format.id === "single" && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-amber font-medium inline-flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Экстренно до 4 часов
                    </span>
                  </>
                )}
                {format.id === "subscription" && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-amber font-medium">Еженедельно</span>
                  </>
                )}
              </div>
              
              {/* CTA */}
              <Button
                variant={format.popular ? "amber" : "outline-light"}
                className="w-full"
                onClick={() => handleSelectFormat(format.id, format.title)}
              >
                Выбрать
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          Не уверены, какой формат подходит? Позвоните нам — поможем определиться бесплатно.
        </p>

        {/* Details (accordion) */}
        <div className="max-w-5xl mx-auto mt-10">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="freq" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Рекомендуемая частота обслуживания
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <p className="mb-3">
                  На практике самый “здоровый” режим ухода — <span className="text-foreground font-medium">4 визита в месяц</span>.
                  Такой график держит в порядке не только стекло и декор, но и саму воду: подмены проходят мягко, без скачков параметров.
                </p>
                <p>
                  При регулярном наблюдении проблемы (болезни рыб, дефициты питания у растений, сбои оборудования) выявляются рано и не
                  успевают перейти в серьёзный ущерб.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="subscription" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Абонемент: что входит (еженедельный визит)
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <ul className="space-y-2 text-sm">
                  {[
                    "Еженедельный уход: подмена воды, чистка стёкол и фильтров, осмотр рыб и растений",
                    "Корма: подбор/доставка, режим кормления; при желании — фасовка по дневным дозам",
                    "Грунт и вода: сифонка, тесты воды, периодические “генеральные уборки”",
                    "Здоровье рыб: лечение при необходимости (включая доп. выезды), замена погибших рыб — по договорённости",
                    "Растения: настройка света, внесение удобрений, замена погибших растений",
                    "Оборудование: настройка/контроль работы, профилактика неполадок",
                    "Квалификация: обслуживают обученные и аттестованные сотрудники сервисного направления",
                    "Срочный выезд при признаках болезни/неполадках оборудования — в течение 24 часов по звонку",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  Стоимость абонемента — <span className="text-foreground font-medium">от 7 000 ₽/мес</span>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fresh-vs-marine" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Пресный vs морской: что отличается в уходе
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                    <p className="text-foreground font-medium mb-2">Пресный</p>
                    <ul className="space-y-2">
                      {[
                        "Системы бывают с искусственным декором и с живыми растениями — подход разный",
                        "В травниках важны тесты по макро/микро, удобрения, стрижка/прополка, баланс света/CO₂",
                        "“Псевдоморе” и интенсивный свет часто требуют более частой чистки декора и контроля водорослей",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                    <p className="text-foreground font-medium mb-2">Морской</p>
                    <ul className="space-y-2">
                      {[
                        "Ключевое — стабильность: температура, солёность, элементы, кислород, устойчивый азотный цикл",
                        "Регулярные тесты и отслеживание динамики параметров; подмена + корректные добавки по ситуации",
                        "Больше оборудования (помпы, пеноотделитель, реакторы/дозаторы) и выше требования к квалификации",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="single-pricing" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Разовый выезд: пример расчёта стоимости
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <p className="mb-4 text-sm">
                  Разовый выезд = “выезд + 1-й час” + (“каждый следующий час” × доп. часы).
                  Итог зависит от фактического времени работ и сложности системы.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-separate border-spacing-0">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4 text-foreground font-medium">Тип аквариума</th>
                        <th className="py-2 pr-4 text-foreground font-medium">Выезд + 1-й час</th>
                        <th className="py-2 text-foreground font-medium">Каждый следующий час</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border/30">
                        <td className="py-2 pr-4">Простой пресноводный</td>
                        <td className="py-2 pr-4">3 900 ₽</td>
                        <td className="py-2">2 900 ₽</td>
                      </tr>
                      <tr className="border-t border-border/30">
                        <td className="py-2 pr-4">Сложный (морской, холодноводный, акваскейп и т.п.)</td>
                        <td className="py-2 pr-4">5 200 ₽</td>
                        <td className="py-2">3 800 ₽</td>
                      </tr>
                      <tr className="border-t border-border/30">
                        <td className="py-2 pr-4">Выезд для диагностики заболеваний</td>
                        <td className="py-2 pr-4">от 5 200 ₽</td>
                        <td className="py-2">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p>Москва и МО: доплата за удалённость от МКАД — <span className="text-foreground font-medium">+200 ₽ за 1 км</span>.</p>
                  <p>Выезды в нерабочее время и в выходные согласуются отдельно.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="diagnostics-microscopy" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Диагностический выезд и микроскопия
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <p className="mb-3 text-sm">
                  Диагностический выезд — это оценка состояния системы, проверка оборудования и диагностика проблем (вода/режим/“история”
                  последних изменений). Иногда одного визита достаточно, чтобы найти причину и составить план действий. Иногда нужна динамика —
                  это нормально.
                </p>
                <p className="mb-4 text-sm">
                  Один из инструментов точной диагностики — <span className="text-foreground font-medium">микроскопические исследования</span>.
                  Их проводим на нашей территории по предварительной договорённости — не всегда это можно сделать на месте без риска для рыб, но
                  иногда это единственный способ подтвердить причину.
                </p>
                <p className="text-sm">
                  Если нужна микроскопия — оставьте заявку и укажите, что хотите исследование (и что происходит с рыбами/водой).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms" className="card-premium px-6 border-none">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-6 transition-colors hover:text-amber">
                Условия, скидки и юридические примечания
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <ul className="space-y-2 text-sm">
                  {[
                    "При одновременном обслуживании 2 аквариумов по одному адресу — скидка 10%",
                    "При одновременном обслуживании 3 аквариумов по одному адресу — скидка 15%",
                    "Возможность выезда в нерабочие часы и в выходные обсуждается индивидуально",
                    "Стоимость услуг указана с учётом НДС",
                    "Цены на услуги и товары приведены для ознакомления и не являются публичной офертой (п. 2 ст. 437 ГК РФ)",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Цены и условия могут меняться. Итоговую стоимость подтверждаем перед началом работ.
          </p>
        </div>
      </div>
      
      <ContactFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ctaText={`Заказать: ${selectedFormat}`}
        formName="service_format"
        prefillComment={prefillComment}
      />
    </section>
  );
}

