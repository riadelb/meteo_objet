class Sun {

    //proprietés
    sunset;
    sunrise;

    constructor(sunLiteral) {
        this.sunset = sunLiteral.sunset;
        this.sunrise = sunLiteral.sunrise;
    }

    //creer une methode pour vconvertir les timestamp en heure minutes
    getTimeFromTimeStamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    getDom() {
        const sun = document.createElement('div');
        sun.innerHTML = `
        <div class="d-flex flex-columns justify-content-around">
            <div class="d-flex flex-row align-items-center">
                <i class="bi bi-sunset"></i>
                <span> Levé du soleil: ${this.getTimeFromTimeStamp(this.sunset)}</span>
            </div>
            <div class="d-flex flex-row align-items-center">
            <i class="bi bi-sunset"></i>
            <span> Couché du soleil: ${this.getTimeFromTimeStamp(this.sunrise)}</span>
            </div>  
            </div>
            `;
        return sun;
    }
}

export default Sun;