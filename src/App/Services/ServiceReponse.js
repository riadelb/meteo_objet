class ServiceResponse {
    ok; // renvoie true si la requête est OK
    error;  // si ok est false, renvoie une erreur
    data; // renvoie la réponse de la requête OK si ok est true

    constructor(ok, error, data) {
        this.ok = ok;
        this.error = error;
        this.data = data;
    }
}

export default ServiceResponse;