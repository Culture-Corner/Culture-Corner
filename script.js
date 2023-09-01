let introText = document.querySelector("#intro-text")
let countriesDiv = document.querySelector("#countries")
let mealsShown = []

//show name of country and image
const display = async () => {
  try {
    countriesDiv.textContent = "";
    countriesDiv.setAttribute("id","countries")
    introText.textContent = "Choose a cuisine to view related meals";
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let areaData = await response.json();
    for (let idx = 0; idx < areaData.meals.length; idx++) {
      let meal = areaData.meals[idx];
      let newDiv = document.createElement("div");
      let countryName = document.createElement("h3");
      countryName.classList.add("country-name")
      countryName.textContent = meal.strArea;
      newDiv.append(countryName)
      newDiv.setAttribute("id", meal.strArea);
      countryName.setAttribute("id", meal.strArea);
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
    if (event.target.classList[0] === "country" || event.target.classList[0] === "country-name") {
    let area = await event.target.id;
    let cousineResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area
    );
    let cousineMeals = await cousineResponse.json()
    introText.textContent = `Click a meal to view it's recipe`
    countriesDiv.textContent = ""
    for (let idx = 0; idx < cousineMeals.meals.length; idx++) {
      let mealDetails = cousineMeals.meals[idx];
      let mealDiv = document.createElement("div")
      mealDiv.setAttribute("class", "meal-div")
      mealDiv.dataset.id = mealDetails.idMeal;
      let foodName = document.createElement("h3");
      foodName.textContent = mealDetails.strMeal;
      foodName.setAttribute("class", "food-name")
      foodName.dataset.id = mealDetails.idMeal;
      let foodImg = document.createElement("img");
      foodImg.setAttribute("src", mealDetails.strMealThumb)
      foodImg.setAttribute("class", "cousine-meal-img");
      foodImg.dataset.id = mealDetails.idMeal;
      countriesDiv.append(mealDiv)
      mealDiv.append(foodName)
      mealDiv.append(foodImg);

    }
    }
  } catch(error) {
    console.log("error: " + error)
  }
}

const displayMealDetails = (mealDetails) => {
  countriesDiv.setAttribute("id", "meal-details")
  countriesDiv.textContent = ""
  introText.textContent = mealDetails.strMeal;
  let foodImg = document.createElement("img");
  foodImg.setAttribute("src", mealDetails.strMealThumb)
  foodImg.setAttribute("class", "meal-img");
  let cousine = document.createElement("h3");
  cousine.textContent = `Cousine: ${mealDetails.strArea}`;
  cousine.setAttribute("id", "cousine");
  countriesDiv.append(foodImg)
  countriesDiv.append(cousine)

  let category = document.createElement("h3");
  category.textContent = `Category: ${mealDetails.strCategory}`;
  category.setAttribute("id", "category")
  countriesDiv.append(category);

  const ingredients = (mealDetails) => {
    let greetIngredient = document.createElement("h3")
    greetIngredient.textContent = "Ingredients:"

    
    let ul = document.createElement("ul")
    for (let i = 1; i < 20; i++) { 
      if (mealDetails[`strIngredient${i}`]){
        let list = document.createElement("li")
        list.textContent = mealDetails[`strMeasure${i}`] + " " + mealDetails[`strIngredient${i}`];
        ul.append(list)
      }
      countriesDiv.append(greetIngredient)
      countriesDiv.append(ul)
    }
  }
  ingredients(mealDetails)

  let greetInstructions = document.createElement("h3");
  greetInstructions.textContent = "Instructions:";
  let instructions = document.createElement("p")
  instructions.textContent = mealDetails.strInstructions
  countriesDiv.append(greetInstructions)
  countriesDiv.append(instructions)

 
  if (mealDetails.strSource) {
    let mealSource = document.createElement("p");
    mealSource.setAttribute("id", "meal-source")
    let mealSourceLink = document.createElement("a");
    mealSourceLink.textContent = mealDetails.strSource;
    mealSourceLink.setAttribute("href", mealDetails.strSource);
    mealSourceLink.setAttribute("target", " _blank");
    mealSource.textContent = `Meal Source: `;
    mealSource.append(mealSourceLink);
    countriesDiv.append(mealSource);
  }
  


  mealDetails.isSaved = false;
  mealsShown.push(mealDetails)
  // console.log(mealsShown)
}

async function showMeal(event) {
  try {
    if (event.target.dataset.id) {

      let id = event.target.dataset.id;
      let mealDetailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      let mealDetails = await mealDetailsResponse.json();
      displayMealDetails(mealDetails.meals[0]);

    }
  } catch (error) {
    console.log("error: " + error);
  }
}



let randomizer = document.querySelector("#randomizer")

const eventHandler = async (event) => {
  try {
    let randomButton = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    let randomArr = await randomButton.json()
    displayMealDetails(randomArr.meals[0])
  } catch (error) {
    console.log("error: " + error);
  }
  
}


randomizer.addEventListener("click", eventHandler);
countriesDiv.addEventListener("click", showCousine);
countriesDiv.addEventListener("click", showMeal);


let websiteName = document.querySelector("#website-name");
websiteName.addEventListener("click", display)