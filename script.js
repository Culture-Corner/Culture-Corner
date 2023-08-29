//js code

const testRoute = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data:", data);
};
const url2 = "https://www.themealdb.com/api/json/v1/1/random.php";

testRoute(url2);