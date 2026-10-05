import PropTypes from 'prop-types';
import './SearchPanel.css';

function SearchPanel({ value, onChange }) {
  return (
    <div className="search-panel">
      <input
        type="text"
        placeholder="Пошук товару..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchPanel;
