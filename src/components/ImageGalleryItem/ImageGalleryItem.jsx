import PropTypes from 'prop-types';
import styles from '../ImageGallery/ImageGallery.module.css';

function ImageGalleryItem({ webImage, openModal, description }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={webImage}
        alt={description}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
