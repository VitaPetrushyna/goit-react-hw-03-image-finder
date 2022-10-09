import styles from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <SearchIcon className={styles.searchIcon} />
        </button>

        <input
          className={styles.searchFormInput}
          name="query"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
