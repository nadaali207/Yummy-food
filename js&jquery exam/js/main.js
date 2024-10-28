
$('.shown-part i.open-close-icon').click(()=>{
    if($('.left-side').css('left')=='0px'){
       closeSide()
    }
    else{
        openSide()
    }
        
})


function closeSide(){
    $('.left-side').animate({left:-$('.side-menu').outerWidth()},500)
    $('.open-close-icon').addClass('fa-align-justify')
    $('.open-close-icon').removeClass('fa-x')
   
    $('.links ul li').animate({top:'300'},500)
}

function openSide(){
    $('.left-side').animate({left:'0'},500)
    $('.open-close-icon').removeClass('fa-align-justify')
    $('.open-close-icon').addClass('fa-x')
    for(let i=0;i<5;i++){
        $('.links ul li').eq(i).animate({top:'0'},(i+5)*100)
    }
}

$('#Search').click(function(){
    closeSide()
    document.querySelector('#searchResult').innerHTML=`<div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control bg-transparent text-white">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFletter(this.value)" type="text" maxlength="1" placeholder="Search By First Letter" class="form-control bg-transparent text-white">
            </div>
        </div>`


        document.getElementById('data').innerHTML=""

})

async function searchByName(name) {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let res = await response.json()
    console.log(res);
    res.meals ? displayMainPage(res.meals) : displayMainPage([])
    $(".spin").fadeOut(300)
}

async function searchByFletter(letter) {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)
    letter == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let res = await response.json()
    console.log(res);
    res.meals ? displayMainPage(res.meals) : displayMainPage([])
    $(".spin").fadeOut(300)
}



async function getRandomMealsandName(para) {
    //  document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${para}`)
    let res = await response.json()
    console.log(res);
    displayMainPage(res.meals)
    
    $(".spin").fadeOut(300)
}

function displayMainPage(arr){
    let cartona=''
    for(let i=0;i<arr.length;i++){
        cartona+=`<div class="col-md-3">
                    <div onclick="getDetails(${arr[i].idMeal})" class="inner-meal position-relative overflow-hidden rounded-2 pointer">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                        <div class="hover-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona
}


async function getDetails(id){
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let result = await response.json()
    console.log(result);
    
    displayDetails(result.meals[0])
    $(".spin").fadeOut(300)

}
function displayDetails(mealid){
    let listIngr = '';
    for(let i=1;i<=30;i++){
        if(mealid[`strIngredient${i}`]){
            listIngr += `<li class="alert alert-info m-2 p-1">${mealid[`strMeasure${i}`]} ${mealid[`strIngredient${i}`]}</li>`
        }

    }
    let details = `<div class="col-md-4">
            <img class="w-100" src="${mealid.strMealThumb}" alt="">
            <h2>${mealid.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${mealid.strInstructions}</p>
            <h3>Area : ${mealid.strArea}</h3>
            <h3>Category : ${mealid.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${listIngr}
            </ul>
            <a class="btn btn-success" target="_blank" href="${mealid.strSource}">Source</a>
            <a  class="btn btn-danger" target="_blank" href="${mealid.strYoutube}">Youtube</a>
        </div>`
        document.getElementById('data').innerHTML=details;
}


async function getCategory() {
    closeSide()
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let result = await response.json()
    console.log(result);
    displayCategories(result.categories)
    $('.spin').fadeOut(300)
}

function displayCategories(categ){
    let cartoona=''
    for(let i =0;i<categ.length;i++){
        cartoona+=` <div class="col-md-3">
                    <div onclick="getCategoryMeals('${categ[i].strCategory}')" class="inner position-relative overflow-hidden rounded-2 inner-meal">
                        <img class="w-100" src="${categ[i].strCategoryThumb}" alt="">
                        <div class="hover-layer position-absolute text-center text-black p-2">
                            <h3>${categ[i].strCategory}</h3>
                            <p>${categ[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartoona
}

async function getCategoryMeals(mealName) {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`)
    let result = await response.json()
    console.log(result);
    displayCategoryMeals(result.meals.slice(0,20))
    
    $('.spin').fadeOut(300)
    
}

function displayCategoryMeals(param) {
    let cartona = ''
    for(let i=0;i<param.length;i++){
        cartona+=`<div class="col-md-3">
                    <div onclick=" getDetails('${param[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 inner-meal">
                        <img class="w-100" src="${param[i].strMealThumb}" alt="">
                        <div class="hover-layer position-absolute text-center text-black p-2 d-flex align-items-center">
                            <h3>${param[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona
}

async function getAreas() {

     document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result = await response.json()
    console.log(result);
    displayAreas(result.meals)
    closeSide()
    $('.spin').fadeOut(300)
}

function displayAreas(city){
    let cartona = ''
    for(let i=0;i<city.length;i++){
        cartona+=`<div class="col-md-3">
                    <div onclick="getAreasMeals('${city[i].strArea}')" class="inner-meal text-center">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${city[i].strArea}</h3>

                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona
}

async function getAreasMeals(area) {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let result = await response.json()
    console.log(result);
   
    displayAreaMeals(result.meals)
    $('.spin').fadeOut(300)
    
}

function displayAreaMeals(coutry){
    let cartona = ''
    for(let i=0;i<coutry.length;i++){
        cartona+=`<div class="col-md-3">
                    <div onclick=" getDetails('${coutry[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 inner-meal">
                        <img class="w-100" src="${coutry[i].strMealThumb}" alt="">
                        <div class="hover-layer position-absolute text-center text-black p-2 d-flex align-items-center">
                            <h3>${coutry[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona

}

async function getIngredients() {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)    
    let result = await response.json()
    console.log(result);
   
    displayIngredients(result.meals.slice(0,20))
    closeSide()
    $('.spin').fadeOut(300)
}

function displayIngredients(ingre){
    let cartona = ''
    for(let i=0;i<ingre.length;i++){
        cartona+=`  <div class="col-md-3">
                    <div onclick="getIngredientsMeals('${ingre[i].strIngredient}')" class="inner-meal text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingre[i].strIngredient}</h3>
                        <p>${ingre[i].strDescription.split(" ").slice(0,20).join(" ")}</p>

                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona
}

async function getIngredientsMeals(ingredients) {
    document.getElementById('data').innerHTML=""
    $('.spin').fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`) 
    let result = await response.json()
    console.log(result);
   
    displayIngredientsMeals(result.meals)
    $('.spin').fadeOut(300)
    
}

function displayIngredientsMeals(x){
    let cartona=''
    for(let i=0;i<x.length;i++){
        cartona+=`<div class="col-md-3">
                    <div onclick=" getDetails('${x[i].idMeal}')" class="inner position-relative overflow-hidden rounded-2 inner-meal">
                        <img class="w-100" src="${x[i].strMealThumb}" alt="">
                        <div class="hover-layer position-absolute text-center text-black p-2 d-flex align-items-center">
                            <h3>${x[i].strMeal}</h3>
                        </div>
                    </div>
                </div>`
    }
    document.getElementById('data').innerHTML=cartona
}

$('#contact').click(function(){
    closeSide()
    $('#searchResult').html('')
    document.getElementById('data').innerHTML=`<div class="min-vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="name" placeholder="Enter Your Name" class="form-control" type="text">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
                            </div>
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="email" placeholder="Enter Your Email" class="form-control" type="email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
                            </div>
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="phone" placeholder="Enter Your Phone" class="form-control" type="text">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>

                            </div>
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="age" placeholder="Enter Your Age" class="form-control" type="number">
                                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>

                            </div>
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="password" placeholder="Enter Your Password" class="form-control" type="password">
                                <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>

                            </div>
                            <div class="col-md-6">
                                <input oninput=" validations(this)" id="repassword" placeholder="Repassword" class="form-control" type="password">
                                <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid repassword</div>

                            </div>
                        </div>
                        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                  </div>`

                  document.getElementById("name").addEventListener("focus", () => {
                    nameInputTouched = true
                })
                document.getElementById("email").addEventListener("focus", () => {
                    emailInputTouched = true
                })
                document.getElementById("phone").addEventListener("focus", () => {
                    phoneInputTouched = true
                })
                document.getElementById("age").addEventListener("focus", () => {
                    ageInputTouched = true
                })
                document.getElementById("password").addEventListener("focus", () => {
                    passwordInputTouched = true
                })
                document.getElementById("repassword").addEventListener("focus", () => {
                    repasswordInputTouched = true
                })
})

let nameInputTouched= false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;





function validations(elem){
    let userName=document.getElementById('name')
    let userEmail=document.getElementById('email')
    let userPassword=document.getElementById('password')
    let userAge=document.getElementById('age')
    let userRepassword=document.getElementById('repassword')
    let userPhone=document.getElementById('phone')    





    var regx ={
        name:/^[a-zA-Z ]+$/,
        email:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password:/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        age:/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    }
    if(nameInputTouched){
       

        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }

    if(emailInputTouched){
        

        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }

    if(phoneInputTouched){
        
        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }

    if(ageInputTouched){
       

        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }

    if(passwordInputTouched){
    

        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }

    if(repasswordInputTouched){
        


        if(regx[elem.id].test(elem.value)==false){
            elem.nextElementSibling.classList.replace('d-none','d-block')
        }
        else{
            elem.nextElementSibling.classList.replace('d-block','d-none')
        }
    }
   if(regx.name.test(document.getElementById("name").value) && regx.email.test(userEmail.value)&&regx.password.test(userPassword.value)&&
   regx.phone.test(userPhone.value)&&regx.age.test(userAge.value)&&repasswordValid()){
    document.getElementById('submitBtn').removeAttribute("disabled")

   }
    


}


function repasswordValid(){
    return document.getElementById("repassword").value == document.getElementById("password").value

}

getRandomMealsandName("")