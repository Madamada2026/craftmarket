import React from 'react';
import PropTypes from 'prop-types';
import './product-card.css';
import placeholderSvg from '../../assets/product-placeholder.svg';

export default function ProductCard({
  name = 'Назва товару',
  price = 0,
  category = 'Загальна',
  image,
  inStock = true,
  onSale = false,
}) {
  return (
    <div className={`product-card ${!inStock ? 'product-card--out-of-stock' : ''}`}>
      <div className="product-card__image-wrapper">
        <img
          src={image || placeholderSvg}
          alt={name}
          className="product-card__image"
        />
        {onSale && inStock && (
          <span className="product-card__badge product-card__badge--sale">
            Розпродаж
          </span>
        )}
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__price">{price} грн</p>
        <span className="product-card__category">{category}</span>

        {!inStock && (
          <div className="product-card__badge">
            Немає в відкритості
          </div>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  image: PropTypes.string,
  inStock: PropTypes.bool,
  onSale: PropTypes.bool,
};

