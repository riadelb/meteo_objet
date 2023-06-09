const iconCDN = 'https://openweathermap.org/img/wn/';

class Weather {
    // Propriétés
    description;
    icon;

    constructor(weatherLiteral) {
        this.description = weatherLiteral.description;
        this.icon = weatherLiteral.icon;
    }

    getDom() {
        const weather = document.createElement('div');
        weather.innerHTML = `
      <div class="d-flex justify-content-center">
          <span>${this.description}</span>
          <img src="${iconCDN}${this.icon}.png" alt="Weather Icon">
      </div>
    `;
        return weather;
    }
}

export default Weather;
