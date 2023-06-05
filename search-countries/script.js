//variables
const countryInput = document.querySelector(".country-input");
const output = document.querySelector(".output");
const searchResults = [];

const countryFetch = fetch(
  `https://restcountries.com/v3.1/name/france?fullText=true`
)
  .then((response) => response.json())
  .then((data) => console.log(data));

// Fetching the API
async function handleSearch() {
  const countrySearch = countryInput.value;

  if (countrySearch) {
    searchResults.forEach((entry) => entry.remove());

    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countrySearch}?fullText=true`
    );
    const data = await response.json();

    console.log(data);

    const div = document.createElement("div");
    div.classList = "output-div";
    div.innerHTML = `
    <div class = "title-and-flag">
    <h3>${data[0].name.common}</h3>
    <img class="flag" src="${data[0].flags.svg}"/>
    </div>
    <p><b style="color: black;">capital:</b> ${data[0].capital[0]}</p>
    <p><b style="color: black;">continent:</b> ${data[0].continents[0]}</p>
    <p><b style="color: black;">spoken languages:</b> ${Object.values(
      data[0].languages
    )
      .toString()
      .split(",")
      .join(",")}</p>
      <p><b style="color: black;">currency:</b> ${
        data[0].currencies[Object.keys(data[0].currencies)].name
      } - ${Object.keys(data[0].currencies)[0]}</p>
      <p><b style="color: black;">population:</b> ${data[0].population}</p>
      <p><b style="color: black;">bordering countries:</b> ${
        data[0].borders
      }</p>
  `;
    output.appendChild(div);
    searchResults.push(div);
  } else {
    const alert = document.querySelector(".alert");
    alert.innerHTML = "Please provide a valid country";
    alert.style.display = "block"; // Show the alert message

    setTimeout(() => {
      alert.style.display = "none"; // Hide the alert message after 0.5 seconds
    }, 1500);
  }
}
// If enter key is pressed it will activate handleSearch()
document.querySelector(".country-input").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    handleSearch();
  }
});
