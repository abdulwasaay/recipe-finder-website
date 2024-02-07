// my javascript code for index.html
// my recipe endpoint:  https://api.edamam.com/api/recipes/v2?type=public&q=burger&app_id=e49a01c3&app_key=7231e326a8b70597cff4c8cbeaec571c%09

// target the search input and the container where content has to be added;
let reciepess = document.getElementById("allReciepes");
let input = document.getElementById("Recipe-input");

// function for sending request
async function GetReciepe(req_url) {
    try {
        // here req_url is a parameter of endpoint of request
        const response = await fetch(req_url);
        const data = await response.json();
        // checking if response success or not
        if (!response.ok) {
            console.log(data)
            alert("Please try again later.")
        }
        // checking if the recipe exist or not
        if (data.hits.length === 0) {
            reciepess.innerHTML = "<div class=' d-flex text-white head'><h1 class=' text-danger '>No</h1><h1>Recipe</h1><h1 class=' text-danger '>Found!</h1></div>"
        } else {
            // adding dynamic recipie html to our main html
            let html = data.hits.map((rec) => {
                return (`<div class="card card-container " style="width: 100%;">
                <div class="card-body">
                  <h5 class="card-title text-center">${rec.recipe.label}</h5>
                  <img src='${rec.recipe.image}' class="card-img-top mt-1" alt="...">
                  <p class="card-text text-center mt-1">Total prep time: ${rec.recipe.totalTime} minutes</p>
                  <p class="card-text text-center">Calories per serving: ${rec.recipe.calories.toFixed(2)}</p>
                </div>
                <div class="card-body text-center">
                  <button onclick="navigateHandler('${rec._links.self.href}')" class="btn btn-primary">Show Recipe</button>
                  </div>
              </div>`
                )
            });
            reciepess.innerHTML = html;
        }
    } catch (err) {
        // request or network type errors will get here
        console.log(err)
        alert("Something Went Wrong! Please try again later.")
    }
}
// calling function for sending data
// I call this function directly to show some recipies on the page before searching
GetReciepe("https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=e49a01c3&app_key=7231e326a8b70597cff4c8cbeaec571c%09")

// function calls when input value change
function changeRecipeHandler() {
    // if input is empty showing the previous response otherwise send the request with the input value parameter in the endpoint.
    if (input.value === "") {
        GetReciepe("https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=e49a01c3&app_key=7231e326a8b70597cff4c8cbeaec571c%09")
    } else {
        let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input.value}&app_id=e49a01c3&app_key=7231e326a8b70597cff4c8cbeaec571c%09`
        // calling request function 
        GetReciepe(url)
    }
}

// function calls when someone click on the search button
function searchHandler() {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input.value}&app_id=e49a01c3&app_key=7231e326a8b70597cff4c8cbeaec571c%09`
    GetReciepe(url)
}

// function calls when someone dynamically navigate to any recipe page 
async function navigateHandler(id) {
    try {
        // sending request via recipe id to get the target recipe that user want
        const res = await fetch(`${id}`);
        const data = await res.json();
        // add it to localstorage to save it to the page
        localStorage.setItem("item", JSON.stringify(data.recipe));
        // making url path to recipe.html for navigating to the page
        window.location.pathname = "recipe.html";
        
        // its all about error handling
        if (!res.ok) {
            alert("Please try again later.")
            console.log(data)
        }
    } catch (err) {
        console.log(err)
        alert("Something Went Wrong! Please try again later.")
    }
}