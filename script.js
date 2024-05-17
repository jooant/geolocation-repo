'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
///Old school way of calling AJAX

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  //Sending request to Web API
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //Getting responded results(JSON data) from Web API
    console.log(this.responseText);
    //Convert JSON data into String
    const [data] = JSON.parse(this.responseText);
    console.log(data.currencies[0]);
    const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[0].nativeName
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

///Render country function
const renderCountry = function (data, className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              data.languages[0].nativeName
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  //Sending request to Web API
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //Getting responded results(JSON data) from Web API
    console.log(this.responseText);
    //Convert JSON data into String
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country we requested on the first place
    renderCountry(data);
    //Get neighbours contries
    const neighbour = data.borders?.[0];
    if(!neighbour) return;

    //AJAX call 2 
    const request2 = new XMLHttpRequest();
    //Sending request to Web API
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function(){
        const data2 = JSON.parse(this.responseText);
        renderCountry(data2, 'neighbour');
    })
  });
};

getCountryAndNeighbour('vietnam');
getCountryData('china');
 
*/
///////////////////////////////////////////////

///PROMISE AND CONSUMING PROMISE

//Render country function
const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} millions people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};


const renderErrorMessage = function(message){
    countriesContainer.insertAdjacentText('beforeend', message);
    countriesContainer.style.opacity = 1;
}

///
// const getCountryAndNeighbour = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`) //return a promise
//   //Handle the returned promise using the then method  
//   .then( response => {

//       if(!response.ok) 
//         throw new Error (`Country not found ${response.status} `); 
//     //Return a rejected promise


//       return response.json() //const [data] = JSON.parse(this.responseText); call JSON method on the response to read the data from that response && RETURNS A PROMISE
//   })
//     ///This 'then' method also a new new promise itself because it returns a promise
//     .then(data => {
//       renderCountry(data[0]);
//       ///We can understanding like thus
//       /*
// We FETCH url of an API to get a PROMISE THEN we get a RESPONSE which will be transform to JSON DATA and THEN we take that DATA and render the country to the DOM.
// */
//       const neighbour = 'sadasdasd';
//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); //return a promise
//     })
//     .then( response => {

//         if(!response.ok) 
//           throw new Error (`Neighbour not found ${response.status} `); 
//         return response.json() 
//     }) 
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//         console.log(`${error} ❌`);
//         renderErrorMessage(`Something went wrong ❌ ${error.message}. Try again!`, );
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1
//     })
// };

//////////////////////////
///HANDLING REJECTED PROMISES


// const getJSON = function(url, errorMessage = `Something went wrong`) {
//     return fetch(url) //return a promise
//     //Handle the returned promise using the then method  
//     .then( response => {
        
//         if(!response.ok) 
//             throw new Error (`${errorMessage} ${response.status} `); 
//         //Return a rejected promise
        
        
//         return response.json() ;//const [data] = JSON.parse(this.responseText); call JSON method on the response to read the data from that response && RETURNS A PROMISE
//     });
// };

// const getCountryAndNeighbour = function (country) {
//     //Country 1
//     getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     ///This 'then' method also a new new promise itself because it returns a promise
//     .then(data => {
//         renderCountry(data[0]);
//         ///We can understanding like thus
//         /*
//         We FETCH url of an API to get a PROMISE THEN we get a RESPONSE which will be transform to JSON DATA and THEN we take that DATA and render the country to the DOM.
//         */
//        const neighbour = data?.[0].borders?.[0];
//        if (!neighbour) throw new Error ('No neighbour found');
  
//         //Country 2
//         return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Neighbour not found'); //return a promise
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(error => {
//         console.log(`${error} ❌`);
//         renderErrorMessage(`Something went wrong ❌ ${error.message}. Try again!`, );
//     })
//     .finally(() => {
//         countriesContainer.style.opacity = 1
//     })
// };



// btn.addEventListener('click', function () {
//   getCountryAndNeighbour('vietnam');
// });
// getCountryAndNeighbour('australia'); ///

/////////////////////////////////////////////
/*
const whereAmI = function(lat, lng) {
    fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    )
    .then(response => {
        if(!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
        return response.json()
    })
    .then(data => {
        console.log(`You are in ${data.city} , ${data.countryName}`);
        return fetch(`https://restcountries.com/v2/name/${data.countryName}`)
    })
    .then(response => {
        if(!response.ok) throw new Error(`Country not found ${response.status}`);

        return response.json()
    })
    .then(data => renderCountry(data[0]))
    .catch(error => {
        console.log(`${error} ❌`);
        renderErrorMessage(`Something went wrong ❌ ${error.message}. Try again!`, );
    })
    .finally(() => {
        countriesContainer.style.opacity = 1
    });
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/
////////////////////////////////////

////////////////////////////////////
const getPosition = function(){
   return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve,reject);
   });

} 

const whereAmI = async function(){

    try {
        //Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        //Reverse geocoding
        const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        if(!resGeo.ok) throw new Error(`Problem getting location data`)
        const dataGeo = await resGeo.json();
        console.log(dataGeo.countryCode);

        //Country data
        const res = await fetch(`https://countries-api-836d.onrender.com/countries/alpha/${dataGeo.countryCode}`);
        if(!res.ok) throw new Error(`Problem getting country`)
        const data = await res.json();
        console.log(data);
        renderCountry(data);
    } catch (error) {
        console.log(error);
        renderErrorMessage(`Something went wrong ${error.message}`);
    }
}
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
