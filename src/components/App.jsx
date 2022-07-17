import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as api from 'services/api';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    largeImage: '',
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

        if (images.hits.length) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            loading: false,
          }));
        } else {
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
      largeImage: '',
    });
  };

  openModal = largeImg => {
    this.setState({
      largeImage: largeImg,
    });
  };

  render() {
    const { images, loading, largeImage } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer />
        {loading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {images.length > 0 && (
          <Button onLoadMoreClick={this.onLoadMoreClick}></Button>
        )}
        {largeImage && (
          <Modal largeImage={largeImage} onModalClick={this.closeModal} />
        )}
      </div>
    );
  }
}
