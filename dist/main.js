
const renderHB = function (tmp, elm, NBAData) {
    const source = $(tmp).html()
    const template = Handlebars.compile(source)
    let newHTML = template({ NBAData })
    $(elm).empty().append(newHTML)

}

const fetchNBAData = function () {
    let input = $("#input").val()
    $.get(`teams/${input}`, function (NBAData) {
        renderHB('#players-template', '.container', NBAData)
        console.log(NBAData)
    })
}