export default class SearchAPI {
  #baseUrl = 'https://pixabay.com/api/';
  #privatKey = '24000530-001c810234599b9b4d7fbf89c';
  #options = {
    imageType: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  #page = 1;
  #perPage = 40;

  constructor() {
    this.searchQuery = '';
  }

  async fetchSearch() {
    const response = await fetch(
      `${this.#baseUrl}?key=${this.#privatKey}&q=${this.searchQuery}&image_type=${
        this.#options.imageType
      }&orientation=${this.#options.orientation}&safesearch=${this.#options.safesearch}&page=${
        this.#page
      }&per_page=${this.#perPage}`,
    );

    const data = await response.json();
    this.#page += 1;

    return data;
  }

  resetPage() {
    this.#page = 1;
  }
}
