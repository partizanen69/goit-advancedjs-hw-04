import axios from 'axios';
import { IMG_PER_PAGE, PIXABAY_KEY } from '../constants';

export const fetchImages = async (searchText, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: PIXABAY_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: IMG_PER_PAGE,
    },
  });
  return response.data;
};
