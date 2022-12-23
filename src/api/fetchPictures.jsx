import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30693396-e1b427b4dccc6c7042daae71f';
const IMAGES_PER_PAGE = 12;

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: IMAGES_PER_PAGE,
};

export const fetchPictures = async (query, page) => {
  const config = {
    params: {
      page: page,
      q: query,
    },
  };
  const response = await axios.get('', config);
  return response.data;
};
