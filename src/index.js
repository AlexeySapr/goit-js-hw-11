import './sass/main.scss';

//Template
import photoCardTpl from './templates/gallery-item.hbs';

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Notiflix.
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// MyJS
import SearchAPI from './js/searchAPI';

const apiService = new SearchAPI();

// Refs
const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('ul.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  apiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  apiService.fetchSearch().then(data => {
    if (data.hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    const markup = data.hits.map(photoCardTpl).join('');
    refs.galleryList.innerHTML = markup;
    new SimpleLightbox('.gallery .photo-card__link');
  });
}

function onLoadMore(event) {
  event.preventDefault();

  const query = 'dog';

  const key = '24000530-001c810234599b9b4d7fbf89c';

  fetch(
    `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=20`,
  )
    .then(response => response.json())
    .then(data => {
      if (data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }

      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      const markup = data.hits.map(photoCardTpl).join('');
      refs.galleryList.insertAdjacentHTML('beforeend', markup);

      new SimpleLightbox('.gallery .photo-card__link');
    });
}

// function renderPhotoCard(photo) {
//   const markup = photoCardTpl(photo);
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
// }
