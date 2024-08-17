// 575cae5 - Richiedi la tua api key su https://www.omdbapi.com/#usage, consulta la documentazione per trovare l'endpoint da
// chiamare per cercare qualsiasi film.

/*  parametri per ricerca film
 t x titolo
 i x ID
 type  valori accettati movie, series, episode
 plot  valori accettati short, full
 
 esempio di url: "http://img.omdbapi.com/?apikey=[yourkey]&"
 */



/*const urlAnchor ="http://img.omdbapi.com/?apikey=";  URL COPIATO DAL SITO MA NON FUNZIONA*/

const urlAnchor = "http://www.omdbapi.com/?apikey=";

const API_KEY = '575cae5';

const selectType = document.getElementById("movieType");
const selectPlot = document.getElementById("movieplot");
const searchByTitle = document.getElementById("searchMovie");
const searchResult = document.getElementById("movie-result");
const plotResult = document.getElementById("plot-result");
const searchButton = document.getElementById('searchFilmBtn')


const compileUrlFromInputs = () =>{
    const movieType = selectType.value;
    const moviePlot = selectPlot.value;
    const movieTitle = searchByTitle.value;
    /*return movieTitle;*/

    return `${urlAnchor}${API_KEY}&type=${movieType}&plot=${moviePlot}&t=${movieTitle}`;

}

/* funzione di test per fare le prove in caso di errori*/
const test = () =>{
    const p_error = document.createElement("p");
    p_error.innerText = "ERRORE"; /*error.value;*/
    console.log(searchResult);
    return "";
    searchResult[0].innerHTML ="";
    searchResult[0].appendChild(p_error);
}

const getData = () =>{
    /*console.log(compileUrlFromInputs());*/
    const url = compileUrlFromInputs();
    return fetch(url)
            .then(data => data.json())
            .then(Response => showResult(Response))
            .catch(error =>{
                console.log("Attenzione errore imprevisto")
                const p_error = document.createElement("p");
                p_error.innerText = "ERRORE IMPREVISTO: " + error.value;
                searchResult.innerHTML ="";
                searchResult.appendChild(p_error)
            } )
}

searchButton.addEventListener('click', getData);
/*searchButton.addEventListener('click', test);*/

const showResult = (result) =>{
    /*console.log(result)*/
    const container = document.createElement("div");
    container.setAttribute('class', 'd-flex gap-2 p-2');

    const dataContainer = document.createElement('div');
    dataContainer.setAttribute('class', 'd-flex flex-column ps-3 gap-2');
   
    
    const boxImage = document.createElement("div");
    const objImg = document.createElement("img");
    objImg.src = result.Poster;
    objImg.title = result.Title;
    boxImage.appendChild(objImg);

    const hTitle = document.createElement("h2")
    hTitle.innerText = "Titolo: " + result.Title;

    const pAuthor = document.createElement("p");
    pAuthor.innerText = "Regista: " + result.Director;

    const pGenre = document.createElement("p");
    pGenre.innerText = "Genere: " + result.Genre;

    const pYear = document.createElement("p");
    pYear.innerText = "Anno di uscita: " + result.Year;

    const pActors = document.createElement("p");
    pActors.innerText = "Attori principali: " + result.Actors

    
    const boxPlot = document.createElement("div");
    boxPlot.setAttribute("class", 'd-flex gap-2 p-2')
    const pPlot = document.createElement("p");
    pPlot.innerText = "Trama: " + result.Plot;
    boxPlot.innerHTML ="";
    boxPlot.appendChild(pPlot);

    dataContainer.append(hTitle, pAuthor, pGenre, pYear, pActors);

    container.innerHTML ="";
    container.append(boxImage,dataContainer);

    searchResult.innerHTML ="";
    searchResult.appendChild(container);

    plotResult.append(boxPlot);

}