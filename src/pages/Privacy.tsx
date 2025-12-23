import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="container relative z-10 px-4 py-16 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Политика конфиденциальности</h1>
        <p className="text-muted-foreground mb-8">
          Здесь будет размещён полный текст политики конфиденциальности (персональные данные, цели обработки,
          сроки хранения, контакты оператора и т.д.).
        </p>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Важно:</strong> текущая версия — заглушка. Перед запуском в рекламу замените на юридически корректный текст.</p>
          <p>Если нужно — подготовлю структуру документа и список обязательных блоков под РФ.</p>
        </div>

        <div className="mt-10">
          <Link to="/" className="text-bio hover:underline">Вернуться на главную</Link>
        </div>
      </div>
    </main>
  );
}










