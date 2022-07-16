import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onLoadMoreClick }) {
  return (
    <div className={styles.buttonPosition}>
      <button type="button" onClick={onLoadMoreClick} className={styles.button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};

export default Button;
