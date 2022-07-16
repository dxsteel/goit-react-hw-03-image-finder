import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as api from '../services/api';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: 0,
    showModal: false,
    largeImage: '',
    selectImageDescription: null,
    loading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;

    if (prevPage < page || prevQuery !== query) {
      this.setState({ loading: true, error: null });

      try {
        const images = await api.fetchImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loading: false,
        }));

        if (images.hits.length === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`,
            {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
            }
          );
        }
      } catch (error) {
        this.setState({
          loading: false,
          error: error.message,
        });
      }
    }
  }

  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onLargeImages = largeImg => {
    this.setState({
      largeImage: largeImg,
      showModal: true,
    });
  };

  render() {
    const { images, showModal, loading, largeImage } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.onLargeImages} />
        )}
        {images.length > 0 && (
          <Button onLoadMoreClick={this.onLoadMoreClick}></Button>
        )}
        {showModal && (
          <Modal largeImage={largeImage} onModalClick={this.closeModal} />
        )}
      </div>
    );
  }
}
