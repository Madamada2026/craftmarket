import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CategoriesContext } from './CategoriesContext';

export function CategoriesProvider({ children }) {
  const [status, setStatus] = useState('loading');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/categories', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Помилка сервера');
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setStatus('success');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err);
        setStatus('error');
      });

    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({ status, categories, error }),
    [status, categories, error]
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};