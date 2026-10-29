import { useContext } from 'react';
import { CategoriesContext } from './CategoriesContext';

export function useCategoriesContext() {
  const context = useContext(CategoriesContext);
  if (context === null) {
    throw new Error('useCategoriesContext має викликатися всередині <CategoriesProvider>');
  }
  return context;
}