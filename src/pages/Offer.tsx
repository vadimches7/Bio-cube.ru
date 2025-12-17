import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container relative z-10 px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Договор оферты</h1>
        <p className="text-muted-foreground mb-8">
          Здесь будет размещён текст публичной оферты/договора (предмет, стоимость, порядок оплаты,
          ответственность, возвраты и т.д.).
        </p>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Важно:</strong> текущая версия — заглушка. Перед публикацией замените на юридически корректный текст.</p>
        </div>

        <div className="mt-10">
          <Link to="/" className="text-bio hover:underline">Вернуться на главную</Link>
        </div>
      </div>
    </main>
  );
}






