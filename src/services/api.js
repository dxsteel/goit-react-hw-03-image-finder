import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = `27622136-3e895bd2b32539c57254a4c60`;
const perPage = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  const { hits } = response.data;
  return { hits };
};

fetchImages.PropTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};
