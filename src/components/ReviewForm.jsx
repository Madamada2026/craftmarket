import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '../schemas/reviewSchema';

function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      authorName: '',
      rating: '',
      reviewText: '',
    },
  });

  const onSubmit = (data) => {
    if (onReviewSubmit) {
      onReviewSubmit(data);
    }
    reset();
  };

  return (
    <div className="mt-8 rounded-card border border-line bg-white p-6 shadow-card max-w-2xl">
      <h3 className="font-display text-xl font-bold text-ink mb-6">
        Залишити відгук про товар
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {/* Адаптивна сітка: 1 колонка на мобільному, 2 на планшеті та десктопі */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
          {/* Поле: Ім'я автора */}
          <div className="flex flex-col gap-1">
            <label htmlFor="authorName" className="text-sm font-medium text-ink">
              Ваше ім'я
            </label>
            <input
              id="authorName"
              type="text"
              {...register('authorName')}
              className={`h-11 rounded-lg border px-3 text-base focus:outline-none focus:ring-2 focus:ring-clay-600/40 ${
                errors.authorName ? 'border-red-500' : 'border-edge'
              }`}
            />
            {/* Фіксована висота для повідомлення, щоб не зсувати макет */}
            <div className="min-h-[20px]">
              {errors.authorName && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.authorName.message}
                </p>
              )}
            </div>
          </div>

          {/* Поле: Оцінка */}
          <div className="flex flex-col gap-1">
            <label htmlFor="rating" className="text-sm font-medium text-ink">
              Оцінка
            </label>
            <select
              id="rating"
              {...register('rating')}
              className={`h-11 rounded-lg border px-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-clay-600/40 ${
                errors.rating ? 'border-red-500' : 'border-edge'
              }`}
            >
              <option value="" disabled>Оберіть оцінку</option>
              <option value="1">1 — Погано</option>
              <option value="2">2 — Задовільно</option>
              <option value="3">3 — Нормально</option>
              <option value="4">4 — Добре</option>
              <option value="5">5 — Відмінно</option>
            </select>
            <div className="min-h-[20px]">
              {errors.rating && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.rating.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Поле: Текст відгуку (займає обидві колонки) */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="reviewText" className="text-sm font-medium text-ink">
            Текст відгуку
          </label>
          <textarea
            id="reviewText"
            rows={4}
            {...register('reviewText')}
            className={`rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-clay-600/40 ${
              errors.reviewText ? 'border-red-500' : 'border-edge'
            }`}
          />
          <div className="min-h-[20px]">
            {errors.reviewText && (
              <p role="alert" className="text-sm text-red-600">
                {errors.reviewText.message}
              </p>
            )}
          </div>
        </div>

        {/* Кнопка надсилання */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-clay-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-clay-700 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-muted"
        >
          {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
        </button>

        {/* Повідомлення про успішний сабміт */}
        {isSubmitSuccessful && (
          <p className="text-sm font-medium text-green-600" role="status">
            Дякуємо за ваш відгук!
          </p>
        )}
      </form>
    </div>
  );
}

export default ReviewForm;
