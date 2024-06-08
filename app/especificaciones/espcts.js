import axios from "axios";
import { useState } from "react";

// 1. Necesito saber como funciona el refresh token:
//      - Que es lo que hace el back end
//      - Que es lo que recibe el front end. 
//      - Que tiene que hacer el front end respecto al refresh token. 


// 2. Para hacer la busqueda de peliculas, el front-end manda peticiones al back-end, 
//    y es el back-end el encargado de realizar todas las operaciones para que el 
//    front-end reciba toda la data (de las peliculas o perfil) lista para mostrarse. 

//    Respecto a la busqueda de peliculas el usuario ingresa un texto y pulsa enter. 
//    El front end necesita un endpoint del back-end de tipo GET para solicitarle que
//    ejecute la busqueda. La peticion se ve de este estilo: 

const [peliculas, setPelculas] = useState(null) // no hay peliculas en un principio

const response = await axios.get('https://<ENDPOINT_DE_NUESTRA_API>', {
        params: {
          query: '<INPUT DEL USER EN LA BARRA DE BUSQUEDA>',
        },
      });
      setPelculas(response.data);


//    Cuando el back-end responda, la variable "data" tiene que tener el json con toda la data
//    de laspeliculas. 
//    Respecto a la estructura del json, nostros principalmente en la lista de peliculas mostramos
//    Titulo, anio de lanzamiento, valoracion, duracion, genero y portada. 
//    Respecto al genero y portada, requieren cierta concatencacion de de los atributos, 
//    Por ejemplo, el poster_path cocatenado a la url donde se encuentran las imagenes de TMDB
//    y por otro lado, los generos que los tenes que consultar de una tabla. 
//    Ese tipo de cosas son faciles de solucionar con el front, pero lo tiene que hacer el back
//    Si tenes mucho problema con eso, lo vemos. 

//    Entonces me tenes que devolver un array de peliculas donde la estructura de cada pelicula es asi: 

interface Movie {
    genres: string[]; //Con los nombres de los generos
    id: number;
    overview: string;
    poster: string; // Directo a la Imagen
    release_date: string;
    title: string;
    vote_average: number;
}





