import { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClick();
    }
  };

  handleClickClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { largeImage, alt, onModalClick } = this.props;
    return (
      <div className={styles.Overlay} onClick={() => onModalClick()}>
        <div className={styles.Modal}>
          <img src={largeImage} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onModalClick: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Modal;
