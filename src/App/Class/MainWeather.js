import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

const iconCDN = "https://openweathermap.org/img/wn/";

class MainWeather {
    clouds;
    country;
    dt;
    locationName;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;

    constructor(mainWeatherLiteral) {
        this.clouds = mainWeatherLiteral.clouds.all;
        this.country = mainWeatherLiteral.sys.country;
        this.dt = mainWeatherLiteral.dt;
        this.locationName = mainWeatherLiteral.name;
        this.main = new Main(mainWeatherLiteral.main);

        //si j'ai des données de pluie je les recupere
        if (mainWeatherLiteral.hasOwnProperty('rain')) {
            this.rain = mainWeatherLiteral.rain['1h'];
        } //si k'ai des données de neige je les recupere
        if (mainWeatherLiteral.hasOwnProperty('snow')) {
            this.snow = mainWeatherLiteral.snow['1h'];
        }
        // on crée l'instance de la classe Sun en lui passant un objet avec les données de sun
        this.sun = new Sun({
            sunrise: mainWeatherLiteral.sys.sunrise,
            sunset: mainWeatherLiteral.sys.sunset
        });
        this.visibility = mainWeatherLiteral.visibility;

        this.weather = new Weather(mainWeatherLiteral.weather[0]);

        this.wind = new Wind(mainWeatherLiteral.wind);

    }

    getDom() {
        const resultDiv = document.getElementById('result');

        const tab1 = document.createElement('div');
        tab1.classList.add('tab-pane', 'fade', 'show', 'active');
        tab1.id = 'tab1';
        tab1.setAttribute('role', 'tabpanel');
        tab1.setAttribute('aria-labelledby', 'tab1-tab');
        tab1.innerHTML = `
            <h5 class="card-title">Informations générales</h5>
             `;
        tab1.append(this.weather.getDom());

        const tab2 = document.createElement('div');
        tab2.classList.add('tab-pane', 'fade');
        tab2.id = 'tab2';
        tab2.setAttribute('role', 'tabpanel');
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `
            <h5 class="card-title">Temperature</h5>
             `;
        tab2.append(this.main.getDom());

        const tab3 = document.createElement('div');
        tab3.classList.add('tab-pane', 'fade');
        tab3.id = 'tab3';
        tab3.setAttribute('role', 'tabpanel');
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `
            <h5 class="card-title">Info sur le vent</h5>
             `;
        tab3.append(this.wind.getDom());

        const tab4 = document.createElement('div');
        tab4.classList.add('tab-pane', 'fade');
        tab4.id = 'tab4';
        tab4.setAttribute('role', 'tabpanel');
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `
            <h5 class="card-title">Info sur le soleil</h5>
             `;
        tab4.append(this.sun.getDom());

        //crée l'élément pour la liste des onglets
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs card-header-tabs';
        tabList.id = 'myTabs';
        tabList.setAttribute('role', 'tablist');
        tabList.innerHTML = `
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" 
                role="tab" aria-controls="tab1" aria-selected="true">Informations générales</a>
            </li>

            <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab2-tab" data-bs-toggle="tab" href="#tab2" 
                role="tab" aria-controls="tab2" aria-selected="false">Temperature</a>
            </li>

            <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab3-tab" data-bs-toggle="tab" href="#tab3"
            role="tab" aria-controls="tab3" aria-selected="false">Info sur le vent</a>
            </li>

            <li class="nav-item" role="presentation">
            <a class="nav-link" id="tab4-tab" data-bs-toggle="tab" href="#tab4"
            role="tab" aria-controls="tab4" aria-selected="false">Info sur le soleil</a>
            </li>
            `;

        //créer l'élement pour le contenu de la carte
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
            </div>
        `;

        //créer l'élément pour la carte
        const card = document.createElement('div');
        card.className = 'card';
        card.append(tabList, cardBody);

        //creer l'élément pour le contenu de la carte
        const cardContainer = document.createElement('div');
        cardContainer.className = 'container mt-4';
        cardContainer.append(card);

        resultDiv.innerHTML = '';
        // const elDivMain = document.createElement('div');
        // elDivMain.append(this.main.getDom(), this.sun.getDom(), this.weather.getDom(), this.wind.getDom());
        resultDiv.appendChild(cardContainer);

    }

}


export default MainWeather;