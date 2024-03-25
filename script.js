let introText = document.querySelector(".main-header h1");
let countriesDiv = document.querySelector("#countries");
let favoritesDiv = document.querySelector("#favorites");
let favoritesPageLink = document.querySelector("#favorite-link")
let mealsShown = [];
let mealsSaved;

const accessBody = async () => {
  let body = await document.querySelector(body);
  return body;
};
body = accessBody;
//show name of country and image
const display = async () => {
  try {
    countriesDiv.textContent = "";
    countriesDiv.setAttribute("id", "countries");
    introText.textContent = "Choose a cuisine to view related meals";
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    let areaData = await response.json();
    for (let idx = 0; idx < areaData.meals.length; idx++) {
      let meal = areaData.meals[idx];
      let newDiv = document.createElement("div");
      let countryName = document.createElement("h3");
      countryName.classList.add("country-name");
      countryName.textContent = meal.strArea;
      newDiv.append(countryName);
      newDiv.setAttribute("id", meal.strArea);
      countryName.setAttribute("id", meal.strArea);
      newDiv.classList.add("country");
      countriesDiv.appendChild(newDiv);
    }
  } catch (error) {
    console.log("error: " + error);
  }
};


const getItemFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const setItemInStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const removeItemFromStorage = (key) => {
  localStorage.removeItem(key);
};

let stored = getItemFromStorage("favorites");
stored ? (mealsSaved = stored) : (mealsSaved = []);

//when country is clicked
let country = document.querySelectorAll(".country");


async function showCousine(event) {
  try {
    if (
      event.target.classList[0] === "country" ||
      event.target.classList[0] === "country-name"
    ) {
      let area = await event.target.id;
      let cousineResponse = await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area
      );
      let cousineMeals = await cousineResponse.json();
      introText.textContent = `Click a meal to view it's recipe`;
      countriesDiv.textContent = "";
      for (let idx = 0; idx < cousineMeals.meals.length; idx++) {
        let mealDetails = cousineMeals.meals[idx];
        let mealDiv = document.createElement("div");
        mealDiv.setAttribute("class", "meal-div");
        mealDiv.dataset.id = mealDetails.idMeal;
        let foodName = document.createElement("h3");
        foodName.textContent = mealDetails.strMeal;
        foodName.setAttribute("class", "food-name");
        foodName.dataset.id = mealDetails.idMeal;
        let foodImg = document.createElement("img");
        foodImg.setAttribute("src", mealDetails.strMealThumb);
        foodImg.setAttribute("class", "cousine-meal-img");
        foodImg.dataset.id = mealDetails.idMeal;

        countriesDiv.append(mealDiv);
        mealDiv.append(foodName);
        mealDiv.append(foodImg);
      }
    }
  } catch (error) {
    console.log("error: " + error);
  }
}

const displayMealDetails = (mealDetails, div) => {
  div.setAttribute("id", "meal-details");
  div.textContent = "";
  introText.textContent = mealDetails.strMeal;
  let foodImg = document.createElement("img");
  foodImg.setAttribute("src", mealDetails.strMealThumb);
  foodImg.setAttribute("class", "meal-img");
  let heart = document.createElement("i");
  heart.setAttribute("class", "fa-regular fa-heart");
  heart.dataset.id = mealDetails.idMeal;
  let cousine = document.createElement("h3");
  cousine.textContent = `Cousine: ${mealDetails.strArea}`;
  cousine.setAttribute("id", "cousine");
  div.append(foodImg);
  div.append(heart);

  div.append(cousine);

  let category = document.createElement("h3");
  category.textContent = `Category: ${mealDetails.strCategory}`;
  category.setAttribute("id", "category");
  div.append(category);

  const ingredients = (mealDetails) => {
    let greetIngredient = document.createElement("h3");
    greetIngredient.textContent = "Ingredients:";

    let ul = document.createElement("ul");
    for (let i = 1; i < 20; i++) {
      if (mealDetails[`strIngredient${i}`]) {
        let list = document.createElement("li");
        list.textContent =
          mealDetails[`strMeasure${i}`] +
          " " +
          mealDetails[`strIngredient${i}`];
        ul.append(list);
      }
      div.append(greetIngredient);
      div.append(ul);
    }
  };
  ingredients(mealDetails);

  let greetInstructions = document.createElement("h3");
  greetInstructions.textContent = "Instructions:";
  let instructions = document.createElement("p");
  instructions.textContent = mealDetails.strInstructions;
  div.append(greetInstructions);
  div.append(instructions);

  if (mealDetails.strSource) {
    let mealSource = document.createElement("p");
    mealSource.setAttribute("id", "meal-source");
    let mealSourceLink = document.createElement("a");
    mealSourceLink.textContent = mealDetails.strSource;
    mealSourceLink.setAttribute("href", mealDetails.strSource);
    mealSourceLink.setAttribute("target", " _blank");
    mealSource.textContent = `Meal Source: `;
    mealSource.append(mealSourceLink);
    div.append(mealSource);
  }

  let heartIcon = document.querySelector(".fa-heart");
  const addToFavorites = (event) => {
    let isFound = false;
    for (let i = 0; i < mealsSaved.length; i++) {
      if (event.target.dataset.id === mealsSaved[i].idMeal) {
        isFound = true;
        mealsSaved.splice(i,1);
        heartIcon.classList.replace("fa-solid", "fa-regular");
        setItemInStorage("favorites", mealsSaved);
      }
    }
    
    if (heartIcon.classList.contains("fa-regular") && !isFound) {
      mealsSaved.unshift(mealDetails);
      setItemInStorage("favorites", mealsSaved);
      heartIcon.classList.replace("fa-regular", "fa-solid");

    }
    heart.classList.toggle("fa-solid");
    heart.classList.toggle("fa-regular");
    displayFavorites(getItemFromStorage("favorites"));
  };
  heartIcon.addEventListener("click", addToFavorites);

  mealDetails.isSaved = false;
  mealsShown.push(mealDetails);
  // console.log(mealsShown)
};

const displayFavorites = async (mealsSaved) => {
  try {
    for (let idx = 0; idx < mealsSaved.length; idx++) {
      let mealId = await mealsSaved[idx].idMeal;

      let mealDiv = document.createElement("div");
      mealDiv.setAttribute("class", "meal-div");
      mealDiv.dataset.id = mealId;
      let foodName = document.createElement("h3");
      foodName.textContent = mealsSaved[idx].strMeal;
      foodName.setAttribute("class", "food-name");
      foodName.dataset.id = mealId;
      let foodImg = document.createElement("img");
      foodImg.setAttribute("src", mealsSaved[idx].strMealThumb);
      foodImg.setAttribute("class", "cousine-meal-img");
      foodImg.dataset.id = mealId;

      favoritesDiv.append(mealDiv);
      mealDiv.append(foodName);
      mealDiv.append(foodImg);
      }
    favoritesDiv.addEventListener("click", showMeal);
  } catch (error) {
    console.log("error: " + error);
  }
};

displayFavorites(mealsSaved);

async function showMeal(event) {
  try {
    if (event.target.dataset.id) {
      let id = event.target.dataset.id;
      let mealDetailsResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      let mealDetails = await mealDetailsResponse.json();
      let div =  countriesDiv || favoritesDiv;
      displayMealDetails(mealDetails.meals[0], div);
    }
  } catch (error) {
    console.log("error: " + error);
  }
}

let randomizer = document.querySelector(".randomizer");

const eventHandler = async (event) => {
  try {
    let randomButton = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    let randomArr = await randomButton.json();
    displayMealDetails(randomArr.meals[0], countriesDiv);
  } catch (error) {
    console.log("error: " + error);
  }
};

if (location.pathname === "/index.html" || "/") {
  display();
  randomizer.addEventListener("click", eventHandler);
  countriesDiv.addEventListener("click", showCousine);
  countriesDiv.addEventListener("click", showMeal);
}

let websiteName = document.querySelector(".website-name");
websiteName.addEventListener("click", display);
