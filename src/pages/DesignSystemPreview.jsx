import { Badge, Button, Input } from "../components/ui";

const VARIANTS = ["primary", "secondary", "danger"];
const SIZES = ["sm", "md", "lg"];
const TONES = ["neutral", "brand", "success", "warning", "danger"];

export default function DesignSystemPreview() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 p-6">
      <h1 className="text-3xl font-bold">Дизайн-система CraftMarket</h1>

      <section aria-labelledby="buttons-title" className="flex flex-col gap-4">
        <h2 id="buttons-title" className="text-xl font-semibold">Кнопки</h2>
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant} / {size}
              </Button>
            ))}
            <Button variant={variant} disabled>
              {variant} / disabled
            </Button>
          </div>
        ))}
      </section>

      <section aria-labelledby="badges-title" className="flex flex-col gap-4">
        <h2 id="badges-title" className="text-xl font-semibold">Бейджі</h2>
        <div className="flex flex-wrap gap-3">
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </div>
      </section>

      <section aria-labelledby="inputs-title" className="flex flex-col gap-4">
        <h2 id="inputs-title" className="text-xl font-semibold">Поля вводу</h2>
        <Input label="Звичайне поле" placeholder="Введіть текст" />
        <Input label="З підказкою" hint="Допоміжний текст під міткою" />
        <Input label="З помилкою" defaultValue="ab" error="Мінімум 3 символи" />
        <Input label="Заблоковане" disabled value="Недоступно" readOnly />
      </section>
    </main>
  );
}
