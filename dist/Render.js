
const renderHB = function (tmp, elm, recipeData) {
    const source = $(tmp).html()
    const template = Handlebars.compile(source)
    let newHTML = template({ recipeData })
    $(elm).empty().append(newHTML)
}

