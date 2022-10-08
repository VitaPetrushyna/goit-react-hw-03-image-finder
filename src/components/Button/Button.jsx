import styles from './Button.module.css';

const Button = ({ btnLoadMore }) => {
  return (
    <button className={styles.button} onClick={btnLoadMore}>
      Load more
    </button>
  );
};

export default Button;
