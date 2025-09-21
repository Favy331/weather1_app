  const inputName = localStorage.getItem("input");
   document.getElementById("resultName").innerHTML = `<h5 class = "text-sucess"> Hi, ${inputName} </h5>`

  const searchField = document.getElementById("search_area");
  const form = document.querySelector("form");

// let target = "Abuja";

const fetchResult = (targetLocation) => {
  const loader = document.getElementById("load")
  loader.classList.remove("d-none")
  let url = `http://api.weatherapi.com/v1/current.json?key=a85e9a5ed49b4525a41115710251809&q=${targetLocation}&aqi=no`;


  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let locationName = data.location.name;
      let time = data.location.localtime;
      let temp = data.current.temp_c;
      let condition = data.current.condition.text;
      let humidity = data.current.humidity;
      let wind = data.current.wind_kph;

      updateDetails(temp, locationName, time, condition, humidity, wind);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    })
    .finally(() => {
      // Hide loader no matter what
      loader.classList.add("d-none");
    });
};


const updateDetails = (temp, locationName, time, condition, humidity, wind) => {
  const box = document.getElementById("box_container");
  box.innerHTML = `
     <div class="mb-3">
      <h3>${locationName}</h3>
      <p class="text-muted small">${time}</p>
    </div>


    <div class="mb-4">
      <div class="card shadow-sm p-3">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="display-3 fw-bold">${condition}°</h1>
            <p class="lead">Partly Cloudy</p>
            <div class="d-flex gap-4 text-muted">
              <span>Feels Like: <strong>${temp}°</strong></span>
            <span>Humidity: <strong>${humidity}%</strong></span>
              <span>Wind: <strong> ${wind}mph</strong></span>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <i class="bi bi-brightness-high text-warning" style="font-size: 4rem;"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
};

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResult(target);
}

form.addEventListener("submit", searchForLocation);

// Default load
fetchResult(target);
