import { z } from 'zod';

export const promoSchema = z.object({
  promoCode: z
    .string()
    .trim()
    .min(1, { message: "Промокод не може бути порожнім" })
    .regex(/^[A-Z0-9]+$/, { message: "Промокод має містити лише великі латинські літери та цифри" })
});
