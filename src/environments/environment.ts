export const environment = {
    _api_base: 'https://pokeapi.co/api/v2/',
    get api_base() {
        return this._api_base;
    },
    set api_base(value) {
        this._api_base = value;
    },
};