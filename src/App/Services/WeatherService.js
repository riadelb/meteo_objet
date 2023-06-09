import HttpUtils from "../Tools/HttpUtils";
import ServiceResponse from "./ServiceReponse";
class WeatherService {
    apiKey;
    options;

    constructor(apiKey, userOptions = {}) {
        this.apiKey = apiKey;
        // option par defaut a chaque appels de service
        this.options = {
            units: 'metric',
            lang: 'fr'
        };
        Object.assign(this.options, { appid: apiKey }, userOptions); // sert a fusionner les options par defaut
    }

    getCurent(coords) {
        const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
        // on va fusionner les options avec les coordonnees pour construire l'url
        Object.assign(this.options, coords);

        // on va construire l'url
        const url = HttpUtils.buildUrl(baseUrl, this.options);
        // => this.options = {
        //appid: '46939e4e2b144b067a45e79f06943c33',
        //units: 'imperial',
        //lang: 'fr',
        //lat: 48.8522,
        //lon: 2.3444,
        //q: 'Paris',

        // on va faire l'appel a l'API
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // on check le code de retour de l'API
                    // code 400 = erreur de connexion
                    // code 404 = ville non trouvée
                    if (data.cod == 400 || data.cod == 404) {
                        resolve(new ServiceResponse(false, data.message, null));
                    }
                    resolve(new ServiceResponse(true, null, data));
                })
                .catch(error => {
                    resolve(new ServiceResponse(false, error.message, null))
                });
        });

    }
}

export default WeatherService;