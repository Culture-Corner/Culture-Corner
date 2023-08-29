//js code

// const testRoute = async (url) => {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("data:", data);
// };
// const url2 = "https://www.themealdb.com/api/json/v1/1/random.php";

// testRoute(url2);
let countriesDiv = document.querySelector("#countries")

//show name of country and image
const display = async () => {
  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let areaData = await response.json();
      console.log(areaData)
      for (let idx = 0; idx < areaData.meals.length; idx++) {
        let meal = areaData.meals[idx];
        let newDiv = document.createElement("div");
        newDiv.textContent = meal.strArea;
        newDiv.classList.add("country")
        countriesDiv.appendChild(newDiv)
        console.log(newDiv)

      }
}
display()


//when country is clicked
let country = document.querySelectorAll(".country");
console.log(country)
async function showCousine(event) {
  // if (event.srcElement/* === "div.class="country"*/) {
    console.log(event.srcElement);

  // } else {
  //   console.log("not country");
  // }

  
}

country.forEach((place) => place.addEventListener("click", showCousine));