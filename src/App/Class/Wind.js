class Wind {
    // Propriétés
    speed;
    deg;
    gust;

    constructor(windLiteral) {
        this.speed = windLiteral.speed;
        this.deg = windLiteral.deg;
        this.gust = windLiteral.gust;
    }

    getDirection(degrees) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
        const index = Math.round(degrees / 45);
        return directions[index];
    }

    getDom() {
        const wind = document.createElement('div');
        wind.classList.add('d-flex', 'justify-content-center', 'flex-column', 'align-items-center');
        wind.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-wind me-2"></i>
                    <span>Vitesse: ${this.convertToKmPerHour(this.speed)} km/h</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-compass me-2"></i>
                    <span>Direction: ${this.getDirection(this.deg)}</span>
                </div>
               
        `;
        //si il y a des rafales on les affiche
        if (this.gust) {
            const gust = document.createElement('div');
            gust.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="bi bi-droplet me-2"></i>
                    <span>Rafales: ${this.convertToKmPerHour(this.gust)} km/h</span>
                </div>
            `;
            wind.append(gust)
        }
        return wind;
    }

    convertToKmPerHour(speed) {
        return (speed * 3.6).toFixed(2);
    }
}

export default Wind;
