import axios from 'axios';

const API_KEY =
  'live_fgu8iS6wymqhXDmI8v5efK6dfuAQbMhu9CJZc761AlQip0E7bIdGEACcOH4rXg1T';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

export function fetchCatByBreed(breedId) {
  return axios.get('https://api.thecatapi.com/v1/images/search', {
    params: {
      breed_ids: breedId,
    },
  });
}
