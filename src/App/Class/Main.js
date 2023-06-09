class Main {

    temp;
    feels_like;
    humidity;
    pressure;
    temp_max;
    temp_min;

    constructor(mainLiteral) {
        this.temp = mainLiteral.temp;
        this.feels_like = mainLiteral.feels_like;
        this.humidity = mainLiteral.humidity;
        this.pressure = mainLiteral.pressure;
        this.temp_max = mainLiteral.temp_max;
        this.temp_min = mainLiteral.temp_min;
    }

    getDom() {
        const main = document.createElement('div');
        main.innerHTML = `
        <div class="d-flex flex-column align-items-center">
            <div class= "d-flex align-items-center">
                <i class= "bi bi-thermometer-half mx-2"></i>
                <span> Temperature: ${this.temp}°C (Ressenti: ${this.feels_like}°C)</span>
            </div>

            <div class= "d-flex align-items-center">
                <i class= "bi bi-thermometer-low mx-2"></i>
                <span> Temperature min: ${this.temp_min}°C</span>
            </div>

            <div class= "d-flex align-items-center">
                <i class= "bi bi-thermometer-high mx-2"></i>
                <span> Temperature max: ${this.temp_max}°C</span>
            </div>

            <div class= "d-flex align-items-center">
                <i class= "bi bi-cloud-download-fill mx-2"></i>
                <span> Pression: ${this.pressure}Hpa</span>
            </div>

            <div class= "d-flex align-items-center">
                <i class= "bi bi-droplet-half mx-2"></i>
                <span> Humidité: ${this.humidity}%</span>
            </div>
        </div>`;
        return main;
    }
}

export default Main;