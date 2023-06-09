// cette classe va contenir des methhodes utilitaires pour gerer les requete HTTP
class HttpUtils {

    // créer une methode qui permet de construire une URL a partir d'une URL de base et de paramètres
    static buildUrl(baseUrl, params) {
        //baseUrl = "http://www.monapi.com";
        // params ={
        //nom: toto,
        //age: 25,
        // ville: "Paris"
        //}
        // => https://monapi.com/tom?age=25&ville=Paris

        // on recupere les clés de l'objet params
        let paramsKeys = Object.keys(params);

        //si je n'ai pas de paramètres je retourne l'url de base
        if (paramsKeys.length <= 0) return baseUrl;

        //je crée un tableau qui va contenir les paramètres
        let paramsArray = [];

        //je parcours les clés de l'objet params dans une boucle
        for (let key in params) {
            //pour trouver la valeur d'une proprété on peut:
            // 1. si on connais le nom de la clé: obj.maClé
            // 2. si le nom de la clé est une chaine de caractères: obj["maClé"]
            let pairedParam = `${key}=${params[key]}`;
            //pairedParam = `nom=toto`;
            paramsArray.push(pairedParam);
            // paramsArray = ["nom=toto", "age=25", "ville=Paris"];
        }
        return `${baseUrl}?${paramsArray.join('&')}`;
        // return 'https://monapi.com/nom=toto?age=25&ville=Paris';
    }
}

export default HttpUtils;