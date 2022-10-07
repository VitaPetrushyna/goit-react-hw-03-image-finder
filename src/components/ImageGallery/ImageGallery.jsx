import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = () => {
  return (
    <ul className={styles.imageGallery}>
      <ImageGalleryItem />
    </ul>
  );
};

export default ImageGallery;
