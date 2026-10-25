import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "./ui";
import { reviewSchema } from "../schemas/reviewSchema.js";

export function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      authorName: '',
      rating: '',
      reviewText: '',
    },
  });

  const onSubmit = async (values) => {
    if (onReviewSubmit) {
      // Безпечно перетворюємо рядок на число безпосередньо перед відправкою події
      onReviewSubmit({
        ...values,
        rating: Number(values.rating),
      });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label="Ім'я"
        autoComplete="given-name"
        error={errors.authorName?.message}
        {...register("authorName")}
      />
      <Input
        label="Оцінка"
        hint="Від 1 до 5"
        type="number"
        min={1}
        max={5}
        error={errors.rating?.message}
        {...register("rating")}
      />
      <Input
        as="textarea"
        rows={4}
        label="Текст відгуку"
        hint="Не менше 10 символів"
        error={errors.reviewText?.message}
        {...register("reviewText")}
      />
      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Надсилання…" : "Надіслати відгук"}
      </Button>
    </form>
  );
}
