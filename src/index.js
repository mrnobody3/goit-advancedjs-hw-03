import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'izitoast/dist/css/iziToast.min.css';

export const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
};
showEl(refs.loaderEl);

const select = new SlimSelect({
  select: refs.selectEl,
  settings: {
    allowDeselect: true,
  },
  events: {
    beforeChange: (newVal, oldVal) => {
      showEl(refs.loaderEl);
      fetchCatByBreed(newVal[0]?.value || oldVal[0]?.value)
        .then(({ data }) => {
          refs.catInfoEl.innerHTML = markup({
            url: data[0]?.url,
            name: data[0]?.breeds[0]?.name,
            desc: data[0]?.breeds[0]?.description,
            temp: data[0]?.breeds[0]?.temperament,
          });
        })
        .catch(e => {
          iziToast.show({
            title: 'Error',
            message: 'Oops! Something went wrong! Try other one!',
            color: 'red',
            position: 'topRight',
          });
        })
        .finally(() => {
          hideEl(refs.loaderEl);
        });

      // return false; // this will stop the change from happening
    },

    error: function (err) {
      console.log('error-->', err);
      iziToast.show({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        color: 'red',
        position: 'topRight',
      });
    },
  },
});

fetchBreeds()
  .then(({ data }) => {
    const optData = data.map(({ name, id }) => ({ text: name, value: id }));
    select.setData(optData);
    showEl(refs.selectEl);
  })
  .catch(e => {
    iziToast.show({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      color: 'red',
      position: 'topRight',
    });
  })
  .finally(() => {
    hideEl(refs.loaderEl);
  });

function markup({ url, name, desc, temp }) {
  return `
      <img src="${url}" alt="${name}" width="500" />
      <div class="">
        <h2>${name}</h2>
        <p>${desc}</p>
        <p>Temperaments: <span style="font-weight: bold;">${temp}</span></p>
      </div>
      `;
}

export function showEl(elem) {
  elem.classList.remove('hidden');
}
export function hideEl(elem) {
  elem.classList.add('hidden');
}
