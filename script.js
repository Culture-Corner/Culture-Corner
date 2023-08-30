let introText = document.querySelector("#intro-text")
let countriesDiv = document.querySelector("#countries")


//show name of country and image
const display = async () => {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let areaData = await response.json();
    for (let idx = 0; idx < areaData.meals.length; idx++) {
      let meal = areaData.meals[idx];
      let newDiv = document.createElement("div");
      newDiv.textContent = meal.strArea;
      newDiv.setAttribute("id", meal.strArea);
      newDiv.classList.add("country");
      countriesDiv.appendChild(newDiv);
    }
  } catch (error) {
    console.log("error: " + error);
  }
  
}
display()


//when country is clicked
let country = document.querySelectorAll(".country");

async function showCousine(event) {
  try {
    if (event.target.classList[0] === "country") {
    let area = await event.target.id;
    let cousineResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area
    );
    let cousineMeals = await cousineResponse.json()
    introText.textContent = `${area} Meals`
    countries.textContent = ""
    for (let idx = 0; idx < cousineMeals.meals.length; idx++) {
      let mealDetails = cousineMeals.meals[idx];
      let mealDiv = document.createElement("div")
      mealDiv.setAttribute("id", "meal-div")
      mealDiv.dataset.id = mealDetails.idMeal;
      let foodName = document.createElement("h3");
      foodName.textContent = mealDetails.strMeal;
      foodName.setAttribute("id", "food-name")
      foodName.dataset.id = mealDetails.idMeal;
      let foodImg = document.createElement("img");
      foodImg.setAttribute("src", mealDetails.strMealThumb)
      foodImg.setAttribute("class", "cousine-meal-img");
      foodImg.dataset.id = mealDetails.idMeal;
      countries.append(mealDiv)
      mealDiv.append(foodName)
      mealDiv.append(foodImg);

    }
    }
  } catch(error) {
    console.log("error: " + error)
  }
}


const showMeal = async (event) => {
  try {
    if (event.target.dataset.id) {
    console.log("meal clicked")
    let id = await event.target.dataset;
    console.log(id)
    
    }
  } catch(error) {
    console.log("error: " + error)
  }
}



countries.addEventListener("click", showCousine);
countries.addEventListener("click", showMeal);

