import 'bootstrap/dist/css/bootstrap.min.css';
// Importer les scripts de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importer les icons de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';
//import du fichier css
import '../assets/style.css';

import WeatherService from './Services/WeatherService';
import ServiceResponse from './Services/ServiceReponse';
import CurrentWeather from './Class/CurrentWeather';
import MainWeather from './Class/MainWeather';

// On déclare notre clé API
const apiKey = '46939e4e2b144b067a45e79f06943c33';

class App {
    constructor() {
        // Elements du DOM
        this.elInputNewLon = null;
        this.elInputNewLat = null;
        this.elInputNewCity = null;
        this.elResultDiv = null;

        // Pour les différents services suivant la localisation
        this.weatherServiceFr = new WeatherService(apiKey);
        this.weatherServiceUk = new WeatherService(apiKey, { lang: 'en' });
        this.weatherServiceUs = new WeatherService(apiKey, { lang: 'en', units: 'imperial' });
    }

    start() {
        console.log('App démarrée...');
        this.loadDom();
    }

    // Méthode qui affiche le DOM
    loadDom() {
        // Création de l'élément <div> avec la classe "container"
        var containerDiv = document.createElement('div');
        containerDiv.classList.add('container');
        containerDiv.classList.add('mt-5');

        // Création de l'élément <h1> avec le texte "Appli météo"
        var h1Element = document.createElement('h1');
        h1Element.textContent = 'Appli météo';
        containerDiv.appendChild(h1Element);

        // Création de l'élément <h4> avec le texte "Entrer les coordonnées géographiques (latitude et longitude) :"
        var h4Element1 = document.createElement('h4');
        h4Element1.classList.add('mt-5');
        h4Element1.textContent = 'Entrer les coordonnées géographiques (latitude et longitude) :';
        containerDiv.appendChild(h4Element1);

        // Création de l'élément <div> avec la classe "form-group" pour la latitude
        var latitudeDiv = document.createElement('div');
        latitudeDiv.classList.add('form-group');
        containerDiv.appendChild(latitudeDiv);

        // Création de l'élément <label> pour la latitude
        var latitudeLabel = document.createElement('label');
        latitudeLabel.setAttribute('for', 'latitude');
        latitudeLabel.textContent = 'Latitude:';
        latitudeDiv.appendChild(latitudeLabel);

        // Création de l'élément <input> de type "text" avec l'id "latitude" et la classe "form-control" pour la latitude
        this.elInputNewLat = document.createElement('input');
        this.elInputNewLat.setAttribute('type', 'text');
        this.elInputNewLat.setAttribute('id', 'latitude');
        this.elInputNewLat.classList.add('form-control');
        latitudeDiv.appendChild(this.elInputNewLat);

        // Création de l'élément <div> avec la classe "form-group" pour la longitude
        var longitudeDiv = document.createElement('div');
        longitudeDiv.classList.add('form-group');
        containerDiv.appendChild(longitudeDiv);

        // Création de l'élément <label> pour la longitude
        var longitudeLabel = document.createElement('label');
        longitudeLabel.setAttribute('for', 'longitude');
        longitudeLabel.textContent = 'Longitude:';
        longitudeDiv.appendChild(longitudeLabel);

        // Création de l'élément <input> de type "text" avec l'id "longitude" et la classe "form-control" pour la longitude
        this.elInputNewLon = document.createElement('input');
        this.elInputNewLon.setAttribute('type', 'text');
        this.elInputNewLon.setAttribute('id', 'longitude');
        this.elInputNewLon.classList.add('form-control');
        longitudeDiv.appendChild(this.elInputNewLon);

        // Création de l'élément <h4> avec le texte "Entrer le nom de la ville:"
        var h4Element2 = document.createElement('h4');
        h4Element2.classList.add('mt-5');
        h4Element2.textContent = 'Entrer le nom de la ville:';
        containerDiv.appendChild(h4Element2);

        // Création de l'élément <div> avec la classe "form-group" pour la ville
        var cityDiv = document.createElement('div');
        cityDiv.classList.add('form-group');
        containerDiv.appendChild(cityDiv);

        // Création de l'élément <label> pour la ville
        var cityLabel = document.createElement('label');
        cityLabel.setAttribute('for', 'city');
        cityLabel.textContent = 'Ville:';
        cityDiv.appendChild(cityLabel);

        // Création de l'élément <input> de type "text" avec l'id "city" et la classe "form-control" pour la ville
        this.elInputNewCity = document.createElement('input');
        this.elInputNewCity.setAttribute('type', 'text');
        this.elInputNewCity.setAttribute('id', 'city');
        this.elInputNewCity.classList.add('form-control');
        cityDiv.appendChild(this.elInputNewCity);

        // Création de l'élément <button> avec la classe "btn btn-primary my-3 form-control" et l'attribut onclick pour afficher la météo
        var button = document.createElement('button');
        button.addEventListener('click', this.getWeather.bind(this));
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('my-3');
        button.classList.add('form-control');
        button.textContent = 'Afficher la météo';
        containerDiv.appendChild(button);

        // Création de l'élément <div> avec l'id "result" pour afficher le résultat de la météo
        this.elResultDiv = document.createElement('div');
        this.elResultDiv.setAttribute('id', 'result');
        this.elResultDiv.classList.add('mt-3');
        containerDiv.appendChild(this.elResultDiv);

        // Ajout du conteneur à la page
        document.body.appendChild(containerDiv);
    }

    getWeather() {
        const newLatitude = this.elInputNewLat.value.trim();
        const newLongitude = this.elInputNewLon.value.trim();
        const newCity = this.elInputNewCity.value.trim();

        // TODO : appel au service pour récupérer la météo
        const newWeatherLiteral = {
            lon: newLongitude,
            lat: newLatitude,
            q: newCity
        };

        // On appelle le service
        this.weatherServiceFr
            .getCurent(newWeatherLiteral)
            .then(this.handleServiceResponse.bind(this));
    }


    handleServiceResponse(serviceResponse) {
        console.log('Service', serviceResponse);

        if (!serviceResponse.ok) {
            this.elResultDiv.append(this.getErrorDom(serviceResponse.error));
        }


        //si la reponse est "ok" on affiche la meteo
        // on devra crée une class pour la metéo
        const currentWeather = new MainWeather(serviceResponse.data);
        this.elResultDiv.append(currentWeather.getDom());
    }
    getErrorDom(error) {
        console.log('Error', error);
        const elDivError = document.createElement('div');
        elDivError.innerHTML = '';
        elDivError.className = 'weather-item error text-danger display-4';
        elDivError.innerHTML = error;
        return elDivError;
    }
}

const app = new App();

export default app;
