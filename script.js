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
    // if (event.srcElement/* === "div.class="country"*/) {
    if (event.target.classList[0] === "country") {
    let area = await event.target.id;
    let cousineResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area
    );
    let cousineMeals = await cousineResponse.json()
    console.log(cousineMeals)
    introText.textContent = `${area} Meals`
    countries.textContent = ""
    for (let idx = 0; idx < cousineMeals.meals.length; idx++) {
      let mealDetails = cousineMeals.meals[idx];
      let mealDiv = document.createElement("div")
      mealDiv.setAttribute("id", "meal-div")
      let foodName = document.createElement("h3");
      foodName.textContent = mealDetails.strMeal;
      let foodImg = document.createElement("img");
      foodImg.setAttribute("src", mealDetails.strMealThumb)
      foodImg.setAttribute("class", "cousine-meal-img");
      countries.append(mealDiv)
      mealDiv.append(foodName)
      mealDiv.append(foodImg);

      console.log(mealDetails)
    }
    }

  
  // } else {
  //   console.log("not country");
  // }
  } catch(error) {
    console.log("error: " + error)
  }
  

  
}

countries.addEventListener("click", showCousine);

let list = document.querySelector("#joke-list")

