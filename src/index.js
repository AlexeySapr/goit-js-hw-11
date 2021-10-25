import './sass/main.scss';

//Template
import photoCardTpl from './templates/gallery-item.hbs';

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Notiflix.
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

// MyJS
import SearchAPI from './js/searchAPI';

const apiService = new SearchAPI();
let simpleGallery = new SimpleLightbox('.gallery .photo-card__link');

// Refs
const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('ul.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Functions
function onSearch(event) {
  event.preventDefault();

  apiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  if (apiService.searchQuery === '') {
    showFailure();
    return;
  }
  apiService.resetPage();
  Loading.standard();
  apiService.fetchSearch().then(data => {
    if (data.hits.length === 0) {
      showFailure();
      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    renderMarkup(data.hits);
    Loading.remove();
    simpleGallery.refresh();
  });
}

function onLoadMore(event) {
  event.preventDefault();
  Loading.standard();
  apiService.fetchSearch().then(data => {
    appendMarup(data.hits);
    Loading.remove();
    simpleGallery.refresh();
  });
}

function showFailure() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function renderMarkup(dataArray) {
  const markup = dataArray.map(photoCardTpl).join('');
  refs.galleryList.innerHTML = markup;
}

function appendMarup(dataArray) {
  const markup = dataArray.map(photoCardTpl).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

// function renderPhotoCard(photo) {
//   const markup = photoCardTpl(photo);
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
// }
