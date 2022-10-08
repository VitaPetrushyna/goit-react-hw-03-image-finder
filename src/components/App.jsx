import { Component } from 'react';
import styles from './App.styles.css';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
// import fetchImages from '../ApiRequest/ApiRequest';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29504531-9bab283f8cb4291b644273701';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      page: 1,
      query: event.target.elements.query.value,
      images: [],
    });

    event.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.query.trim() === '') {
      alert('What to show you?');
      return;
    }

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${this.state.query}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({ images: response.data.hits });
        console.log(this.state.images);
      } catch (error) {}
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        <Button btnLoadMore={this.loadMore} />
      </div>
    );
  }
}
