import 'normalize.css';
import 'izitoast/dist/css/iziToast.min.css';

import iziToast from 'izitoast';
import { fetchImages } from './api/pixabay';
import { hide, show } from './utils';
import { IMG_PER_PAGE } from './constants';

iziToast.settings({
  timeout: 5000,
  position: 'topRight',
});

const formElem = document.getElementById('search-form');
const searchInputElem = formElem.querySelector('input[name="searchQuery"]');
const submitBtnElem = formElem.querySelector('button[type="submit"]');
const galleryContainerElem = document.querySelector('.gallery');
const loadMoreBtnElem = document.querySelector('.load-more');
const loadMoreEndElem = document.querySelector('.load-more-end');

submitBtnElem.addEventListener('click', runSearch);
loadMoreBtnElem.addEventListener('click', loadMore);

let isRequestInProgress = false;
let page = 1;

async function runSearch(e) {
  e.preventDefault();

  if (isRequestInProgress) {
    return;
  }

  const searchText = searchInputElem.value.trim();
  if (!searchText) {
    return;
  }

  let data;
  page = 1;
  isRequestInProgress = true;
  submitBtnElem.disabled = true;
  galleryContainerElem.innerHTML = '';
  hide(loadMoreBtnElem);
  hide(loadMoreEndElem);

  try {
    console.log('Fetching images', searchText, page);
    data = await fetchImages(searchText, page);
  } catch (err) {
    console.error('Request to pixabay failed with error', err);
    iziToast.error({
      title: 'Request to pixabay failed with error',
      message: err.message,
    });

    return;
  } finally {
    isRequestInProgress = false;
    submitBtnElem.disabled = false;
  }

  console.log('response from pixabay', data);

  if (!data.total) {
    iziToast.warning({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }

  iziToast.success({
    message: `Hooray! We found ${data.total} images.`,
  });

  galleryContainerElem.innerHTML = createCardsMarkup(data.hits);

  if (data.totalHits > page * IMG_PER_PAGE) {
    show(loadMoreBtnElem);
  }
}

async function loadMore() {
  if (isRequestInProgress) {
    return;
  }

  hide(loadMoreBtnElem);
  submitBtnElem.disabled = true;

  const searchText = searchInputElem.value.trim();

  let data;
  try {
    console.log('Loading more images', searchText, page + 1);
    isRequestInProgress = true;
    data = await fetchImages(searchText, page + 1);
  } catch (err) {
    console.error('Request to pixabay failed with error', err);
    iziToast.error({
      title: 'Request to pixabay failed with error',
      message: err.message,
    });
    show(loadMoreBtnElem);

    return;
  } finally {
    submitBtnElem.disabled = false;
    isRequestInProgress = false;
  }

  console.log('response from pixabay load more', data);

  page++;
  handleLoadMore(data.totalHits, page);

  if (!data.hits) {
    return;
  }

  galleryContainerElem.insertAdjacentHTML(
    'beforeend',
    createCardsMarkup(data.hits)
  );
}

const createCardsMarkup = hits => {
  const cards = [];
  for (const img of hits) {
    cards.push(`
      <div class="photo-card">
        <img src="${img.previewURL}" alt="${img.tags}" loading="lazy" width="250" height="150" />
        <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${img.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${img.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${img.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${img.downloads}</span>
            </p>
        </div>
      </div>
  `);
  }

  return cards.join('');
};

const handleLoadMore = (totalHits, page) => {
  if (totalHits > page * IMG_PER_PAGE) {
    show(loadMoreBtnElem);
  } else {
    show(loadMoreEndElem);
  }
};
