const title = document.querySelector(".title");
const countriesSelect = document.getElementById("countries");
const BASE_URL = "https://covid19.mathdro.id/api";
let countriesOptions = [];
let error = null;
const errorDiv = document.querySelector(".error");
let info = "";
const infoDiv = document.querySelector(".info");
const countryStatsDiv = document.querySelector(".country-stats");

countriesSelect.addEventListener("change", e => {
  const countryCode = e.target.value;
  console.log(countryCode);
  getStatistics(countryCode)
    .then(stats => {
      displayStatistics(stats);
    })
    .catch(err => {
      countryStatsDiv.innerHTML = "LIVE DATA";
      errorDiv.innerText = err.message;
    });
});

function getCountries() {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/countries`)
      .then(data => data.json())
      .then(countries => {
        resolve(countries);
      })
      .catch(err => {
        reject(err);
        errorDiv.innerText = "LIVE DATA";
      });
  });
}

getCountries().then(data => {
  let option;
  Object.entries(data.countries).forEach(country => {
    option = document.createElement("option");
    option.text = country[1].name;
    option.value = country[1].iso2;
    countriesSelect.add(option);
  });
});

getStatistics("select").then(stats => {
  displayStatistics(stats);
});

function displayStatistics(stats) {
  const lastUpdate = new Date(stats.lastUpdate);
  const niceDate = getLastDataUpdateDate(lastUpdate);
  errorDiv.innerText = "";
  const countryStats = `
        <div class="row">
            <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Confirmed : ${stats.confirmed.value}</h5>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Recovered : ${stats.recovered.value}</h5>
                </div>
                </div>
            </div>
             <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Deaths : ${stats.deaths.value}</h5>
                </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 mt-4">Todays live  ${niceDate}</div>
        </div>
    `;
  countryStatsDiv.innerHTML = countryStats;
}

function getLastDataUpdateDate(lastUpdate) {
  return `${makeToDigits(lastUpdate.getDate())}/${makeToDigits(
    lastUpdate.getMonth() + 1
  )}/${makeToDigits(lastUpdate.getFullYear())}  ${makeToDigits(
    lastUpdate.getHours()
  )}H${makeToDigits(lastUpdate.getMinutes())}min`;
}

function makeToDigits(value) {
  return value > 9 ? value : "0" + value.toString();
}

function getStatistics(countryCode) {
  let url;
  if (countryCode === "select") {
    url = "https://covid19.mathdro.id/api";
  } else {
    url = `${BASE_URL}/countries/${countryCode}`;
  }
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(data => data.json())
      .then(stats => {
        console.log("stats", stats);
        if (stats.error) {
          throw Error(stats.error.message);
        }
        resolve(stats);
      })
      .catch(err => {
        reject(err);
        errorDiv.innerText = `LIVE DATA ${countryCode}`;
      });
  });
}
