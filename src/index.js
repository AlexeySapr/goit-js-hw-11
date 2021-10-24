import './sass/main.scss';

//Template
import photoCardTpl from './templates/gallery-item.hbs';

// SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('ul.gallery'),
};

const key = '24000530-001c810234599b9b4d7fbf89c';

fetch(
  `https://pixabay.com/api/?key=${key}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=20`,
)
  .then(response => response.json())
  .then(data => {
    const markup = data.hits.map(photoCardTpl).join('');
    refs.galleryList.innerHTML = markup;
    new SimpleLightbox('.gallery .photo-card__link');
  });

// function renderPhotoCard(photo) {
//   const markup = photoCardTpl(photo);
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
// }
