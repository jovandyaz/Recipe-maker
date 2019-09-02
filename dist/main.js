
const fetchRecipeData = function () {
    let input = $("#input").val()
    console.log(input)
    $.get(`recipes/${input}`, function (recipeData) {
        renderHB('#recipes-template', '.container', recipeData)
        console.log(recipeData)
    })
}

$(".container").on("click",".recipes-template", function () {
    let postId = $(this).closest(".recipe").data().id

})