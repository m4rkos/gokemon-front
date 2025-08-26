export const environment = {
    _api_base: 'http://gokemon-app:8080/',
    get api_base() {
        return this._api_base;
    },
    set api_base(value) {
        this._api_base = value;
    },
};
