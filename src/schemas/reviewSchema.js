import { z } from 'zod';

export const reviewSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я не може перевищувати 50 символів"),
  rating: z
    .string({ required_error: "Будь ласка, оберіть оцінку від 1 до 5" })
    .trim()
    .min(1, "Будь ласка, оберіть оцінку від 1 до 5")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 1 && num <= 5;
    }, { message: "Оцінка має бути числом від 1 до 5" }),
  reviewText: z
    .string()
    .trim()
    .min(10, 'Текст відгуку має містити щонайменше 10 символів')
    .max(500, 'Текст відгуку не може перевищувати 500 символів'),
});
