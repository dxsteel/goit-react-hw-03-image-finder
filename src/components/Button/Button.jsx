import styles from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <div className={styles.buttonPosition}>
      <button type="button" onClick={onClick} className={styles.button}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
