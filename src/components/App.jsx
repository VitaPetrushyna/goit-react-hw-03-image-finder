import { Component } from 'react';
import styles from './App.styles.css';
import toast, { Toaster } from 'react-hot-toast';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getImages } from '../ApiRequest/ApiRequest';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    loading: false,
    error: null,
    showModal: false,

    modalImgProps: { url: '', alt: '' },
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    // const prevQuery = prevState.query;
    // const newQuery = query;

    if (query.trim() === '') {
      toast('What to show you?', {
        icon: '👏',
      });
      return;
    }

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ loading: true, images: [] });

      // if (prevState.query !== this.query) {
      //   this.setState({ images: [], page: 1 });
      // }

      try {
        const images = await getImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));

        if (images.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        toast.error('Something went wrong :(');
        // this.setState({
        //   error: 'Something went wrong :(',
        // });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      page: 1,
      query: event.target.elements.query.value,
      images: [],
    });

    // event.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = ({ largeImageURL: url, tags: alt }) => {
    this.setState({ modalImgProps: { url, alt } });
    this.toggleModal();
  };

  render() {
    const {
      loading,
      error,
      images,
      showModal,

      modalImgProps: { url, alt },
    } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {loading && <Loader />}
        {showModal && <Modal url={url} alt={alt} onClose={this.toggleModal} />}
        <ImageGallery images={images} openModal={this.handleImgClick} />
        {images.length !== 0 && <Button btnLoadMore={this.loadMore} />}
        <Toaster position="top-left" />
      </div>
    );
  }
}
