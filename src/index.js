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

//Objects
const apiService = new SearchAPI();
const simpleGallery = new SimpleLightbox('.gallery .photo-card__link');

// Refs
const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('ul.gallery'),
  loadMoreBtn: document.querySelector('button.load-more'),
};

//Listeners
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

  fetchAndRenderImages();
}

function onLoadMore(event) {
  event.preventDefault();
  addAndRenderImages();
}

async function fetchAndRenderImages() {
  apiService.resetPage();
  Loading.standard();
  let data = null;
  try {
    data = await apiService.fetchSearch();
  } catch (error) {
    console.log('Eror', error.name);
  }

  if (data.hits.length === 0) {
    showFailure();
    Loading.remove();
    return;
  }

  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  renderMarkup(data.hits);
  showLoadMoreBtn();
  Loading.remove();
  simpleGallery.refresh();
  /* */
  window.scroll(top);
}

async function addAndRenderImages() {
  Loading.standard();
  let data = null;
  try {
    data = await apiService.fetchSearch();
  } catch (error) {
    console.log('Eror', error.name);
  }
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  appendMarkup(data.hits);
  Loading.remove();
  simpleGallery.refresh();
  smoothScroll();
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function showFailure() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function renderMarkup(dataArray) {
  const markup = dataArray.map(photoCardTpl).join('');
  refs.galleryList.innerHTML = markup;
}

function appendMarkup(dataArray) {
  const markup = dataArray.map(photoCardTpl).join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
