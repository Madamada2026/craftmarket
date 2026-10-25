import PropTypes from 'prop-types';
import { Modal } from './ui';

export default function ProductModal({ product, onClose }) {
  return (
    <Modal isOpen={true} onClose={onClose} size="lg" title={product.name}>
      <p className="mt-1 text-sm text-ink-500">{product.category}</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="mt-4 aspect-video w-full rounded-control object-cover"
        />
      )}
      <p className="mt-4 text-2xl font-bold text-ink-900">{product.price} грн</p>
    </Modal>
  );
}

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
