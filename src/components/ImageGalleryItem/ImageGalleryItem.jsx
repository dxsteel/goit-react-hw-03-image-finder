import PropTypes from 'prop-types';
import styles from '../ImageGallery/ImageGallery.module.css'

function ImageGalleryItem({ webImage, openModal, alt }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img className={styles.ImageGalleryItemImage} src={webImage} alt="" onClick={openModal} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
    webImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;