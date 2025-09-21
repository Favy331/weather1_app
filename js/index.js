  // const inputName = localStorage.getItem("input");
  //  document.getElementById("resultName").innerHTML = `<h5 class = "text-sucess"> Hi, ${inputName} </h5>`

 const searchField = document.getElementById("search_area");
const form = document.querySelector("form");
// let target = "Abuja"; 

const fetchResult = (targetLocation) => {
  const loader = document.getElementById("load");
  const box = document.getElementById("box_container");

  if (!loader || !box) {
    console.error("Loader or box_container not found in DOM!");
    return;
  }

  
  loader.classList.remove("d-none");
   
  box.innerHTML = "";

  let url = `https://api.weatherapi.com/v1/current.json?key=a85e9a5ed49b4525a41115710251809&q=${targetLocation}&aqi=no`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.location) {
        throw new Error("Invalid data from API");
      }

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
      box.innerHTML = `<p class="text-danger">Could not fetch weather data. Try again.</p>`;
    })
    .finally(() => {
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
            <h1 class="display-3 fw-bold">${temp}°</h1>
            <p class="lead">${condition}</p>
            <div class="d-flex gap-4 text-muted">
              <span>Feels Like: <strong>${temp}°</strong></span>
              <span>Humidity: <strong>${humidity}%</strong></span>
              <span>Wind: <strong>${wind} kph</strong></span>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <i class="bi bi-brightness-high text-warning" style="font-size: 4rem;"></i>
          </div>
        </div>
      </div>
    </div>
  `;
};

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();
  if (target) {
    fetchResult(target);
  }
}

form.addEventListener("submit", searchForLocation);

// Default load
fetchResult(target);
