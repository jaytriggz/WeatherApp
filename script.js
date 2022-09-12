// declearing an object for storing the functions and variables that will be necessary for using the API
let weather = {
    
    apiKey: "f289573d646ae372825cfedf968e1c4b", //My API key from openweathermap 
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" + //fetching the needed data
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();  //response 
        })
        .then((data) => this.displayWeather(data));
    },
    //function that displays Weather 
    displayWeather: function (data) {       
       const { name } = data;
      const { icon, description } = data.weather[0]; //gets the first element of data.weather object 
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name; //displays the info retrieve from the API to the page  
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";

      document.querySelector(".description").innerText = description;

      document.querySelector(".temp").innerText = temp + "°C";

      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";

      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";  

        //the function that handles wrong inputs or mistakes
      document.querySelector(".weather").classList.remove("loading");

      //post generic images clued from upsplash.com
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    //function for the search button
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  //this function takes in the event as a params 
  document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
    //the functions that is been called when the page reloads
  weather.fetchWeather("ikeja");
     
  