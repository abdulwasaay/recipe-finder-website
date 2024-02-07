// getting data from local storage

let uniRecipe = localStorage.getItem("item");
let data = JSON.parse(uniRecipe);

// Now setting data as html for a recipe dynamic page

// recipe page javascript file

// get data from localstorage and add dynamically to the recipe page html
let uniqueRecipe = document.getElementById("uniqueRecipe");
let ingredients = data.ingredientLines.map(ing => {
    return `<li>${ing}</li>`
})
let recipeHtml = 
`<div class = ' text-white'>
<div class='recipe-cont d-flex justify-content-center mt-5 '>
<img src='${data.image}' class=' img me-4 rounded-2'/>
<div class='content d-flex flex-column justify-content-center ms-4  '>
<h2>${data.label}</h2>
<p>Total prep time: ${data.totalTime} minutes</p>
<p>Calories per serving: ${data.calories.toFixed(2)}</p>
<p>Dish type: ${data.dishType[0]}</p>
</div>
</div>
<div class=' steps d-flex flex-column align-items-center mt-5 '>
<div class='childSteps'>
<h1>Steps:</h1>
<ul>
${ingredients}
</ul>
</div>
</div>
</div>`;
uniqueRecipe.innerHTML = recipeHtml;