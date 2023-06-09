// on declare une constante pour recuperer les url de l'API
const iconCDN = "https://openweathermap.org/img/wn/";
class CurrentWeather {
    // on declare nos properties
    description;
    icon;
    temperature;
    humidity;
    windSpeed;
    city;
    country;

    constructor(currentWeatherLiteral) {

        this.description = currentWeatherLiteral.weather[0].description;
        this.icon = iconCDN + currentWeatherLiteral.weather[0].icon + ".png";
        this.temperature = currentWeatherLiteral.main.temp;
        this.humidity = currentWeatherLiteral.main.humidity;
        this.windSpeed = currentWeatherLiteral.wind.speed;
        this.city = currentWeatherLiteral.name;
        this.country = currentWeatherLiteral.sys.country;
    }

    getDom() {
        const resultDiv = document.getElementById('result');

        //     //créer une div avec la classe card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-3';
        cardDiv.style.maxWidth = '540px';
        cardDiv.style.backgroundColor = '#E3E3E3';

        //     //créer une div avec la classe row
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row g-0';

        //     //créer une colonne pour l'image
        const colImgDiv = document.createElement('div');
        colImgDiv.className = 'col-md-4';

        //     //créer une image
        const iconImg = document.createElement('img');
        iconImg.src = this.icon;
        iconImg.alt = `icone météo: ${this.description}`;
        iconImg.className = 'img-fluid rounded-start w-100';

        //     //créer une colonne pour le contenu de la carte
        const colContentDiv = document.createElement('div');
        colContentDiv.className = 'col-md-8';

        //     //créer le corps de la card
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        //     //créer le titre de la card
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = `${this.city}, ${this.country}`;

        //     //créer le paragraphe de la description du temps
        const descP = document.createElement('p');
        descP.className = 'card-text';
        descP.textContent = this.description;

        //     //créer le paragraphe de la température
        const tempP = document.createElement('p');
        tempP.className = 'card-text';
        tempP.textContent = `Température: ${this.temperature}°C`;

        //     //créer le paragraphe de l'humidité
        const humidityP = document.createElement('p');
        humidityP.className = 'card-text';
        humidityP.textContent = `Humidité: ${this.humidity}%`;

        //     //créer le paragraphe de la vitesse du vent
        const windSpeedP = document.createElement('p');
        windSpeedP.className = 'card-text';
        windSpeedP.textContent = `Vitesse du vent: ${this.windSpeed}m/s`;

        //     //on va ajouter les éléments dans le DOM
        //     //on va ajouter l'image dans la colonne de l'image
        colImgDiv.appendChild(iconImg);
        //on va ajouter le titre, la description, la température, l'humidité et la vitesse du vent dans le corps de la card
        cardBodyDiv.append(cardTitle, descP, tempP, humidityP, windSpeedP);
        //on va ajouter le corps de la card dans la colonne du contenu
        colContentDiv.appendChild(cardBodyDiv);
        //on va ajouter la colonne de l'image et la colonne du contenu dans la div row
        rowDiv.append(colImgDiv, colContentDiv);
        //on va ajouter la div row dans la div card
        cardDiv.appendChild(rowDiv);

        //     //on va ajouter la div card dans la div result
        resultDiv.innerHTML = '';
        resultDiv.appendChild(cardDiv);


    }
}
export default CurrentWeather;