//OPEN WEATHER KEY/////////////////////////////////////////////////////////////////////////////////////////////////////////
const KEY = '7e44fe40f6070e033fef8c5210183815';

//API CALL URL/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} --> forecast
//http://api.openweathermap.org/geo/1.0/direct?q=${municipio}&limit=1&appid=${KEY} --> geocoding
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} --> current weather

//API WEATHER CALL (current)///////////////////////////////////////////////////////////////////////////////////////////////
const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${KEY}`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

//API WEATHER CALL (forecast)//////////////////////////////////////////////////////////////////////////////////////////////
const getForecastWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${KEY}`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

//GEOCODING CALL///////////////////////////////////////////////////////////////////////////////////////////////////////////
const apiCallGeocoding = async (municipio) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${municipio}&limit=1&appid=${KEY}`
    );
    const data = await response.json();
    console.log(data);

    const { lat, lon } = data[0];

    //llamada a la función con los argumentos latitude & longitude
    await getCurrentWeather(lat, lon);
    await getForecastWeather(lat, lon);
  } catch (err) {
    console.error(err);
  }
};

//esta llamada a la función de geocoding tendrá que ir dentro del eventlistener del button
//y se puede crear otro evento keydown para llamar a la APi EL tiempo con un array de municipios
//para hacer el autocomplete
apiCallGeocoding('coristanco');
