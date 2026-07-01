import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-tight py-24 md:py-40 text-center">
      <div className="kicker justify-center mb-4">404</div>
      <h1 className="text-display-2 font-display text-ink">
        Такой страницы у нас пока нет
      </h1>
      <p className="mt-4 text-lg text-muted max-w-lg mx-auto">
        Возможно, ссылка устарела или содержит опечатку. Вернитесь на главную или
        посмотрите каталог программ.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/programs">Каталог программ</Link>
        </Button>
      </div>
    </div>
  );
}
