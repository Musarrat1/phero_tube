function loadCategory(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then((data)=>displayCategory(data.categories))

}
function displayCategory(categories){
    console.log(categories)
}
loadCategory()