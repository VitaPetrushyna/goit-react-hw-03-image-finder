import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, imageSrc, alt }) => {
  return (
    <li className={styles.imageGalleryItem} data-id={id}>
      <img src={imageSrc} alt={alt} className={styles.imageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
