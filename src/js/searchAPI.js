export default class SearchAPI {
  #baseUrl = 'https://pixabay.com/api/';
  #privatKey = '24000530-001c810234599b9b4d7fbf89c';
  #options = {
    imageType: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  #page = 1;
  #perPage = 20;

  constructor() {
    this.searchQuery = '';
  }

  fetchSearch() {
    return fetch(
      `${this.#baseUrl}?key=${this.#privatKey}&q=${this.searchQuery}&image_type=${
        this.#options.imageType
      }&orientation=${this.#options.orientation}&safesearch=${this.#options.safesearch}&page=${
        this.#page
      }&per_page=${this.#perPage}`,
    ).then(response => {
      this.incrementPage();
      return response.json();
    });
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   set query(newQuery) {
  //     this.searchQuery = newQuery;
  //   }
}
