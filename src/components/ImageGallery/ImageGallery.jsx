import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => (
  <ul className={styles.imageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        imageSrc={image.webformatURL}
        alt={image.tags}
      />
    ))}
  </ul>
);

export default ImageGallery;
