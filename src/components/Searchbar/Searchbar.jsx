import { Component } from 'react';
import styles from './Searchbar.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputValue = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('The input field is empty!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      return;
    }
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>
              <BsSearch />
            </span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleInputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        <ToastContainer />
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
