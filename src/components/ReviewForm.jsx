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
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#ffffff', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
        Залишити відгук про товар
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Ім'я автора */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="authorName" style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Ваше ім'я
          </label>
          <input
            id="authorName"
            type="text"
            {...register('authorName')}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
          />
          {errors.authorName && (
            <p role="alert" style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>
              {errors.authorName.message}
            </p>
          )}
        </div>

        {/* Оцінка */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="rating" style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Оцінка
          </label>
          <select
            id="rating"
            {...register('rating')}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
          >
            <option value="" disabled>
              Оберіть оцінку
            </option>
            <option value="1">1 — Погано</option>
            <option value="2">2 — Задовільно</option>
            <option value="3">3 — Нормально</option>
            <option value="4">4 — Добре</option>
            <option value="5">5 — Відмінно</option>
          </select>
          {errors.rating && (
            <p role="alert" style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Текст відгуку */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="reviewText" style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
            Текст відгуку
          </label>
          <textarea
            id="reviewText"
            rows={4}
            {...register('reviewText')}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
          />
          {errors.reviewText && (
            <p role="alert" style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>
              {errors.reviewText.message}
            </p>
          )}
        </div>

        {/* Кнопка надсилання */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 16px',
            backgroundColor: isSubmitting ? '#94a3b8' : '#0d9488',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px',
          }}
        >
          {isSubmitting ? 'Надсилання…' : 'Залишити відгук'}
        </button>

        {/* Повідомлення про успішний сабміт */}
        {isSubmitSuccessful && (
          <p style={{ color: '#16a34a', fontSize: '14px', margin: 0, fontWeight: '500' }} role="status">
            Дякуємо за ваш відгук!
          </p>
        )}
      </form>
    </div>
  );
}

export default ReviewForm;
