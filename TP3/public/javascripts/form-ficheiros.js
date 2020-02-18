$(function() {
    var cont = 1
    var numQuery = 0
    $("#mais1").click(e => {
        if(numQuery == 0){
            e.preventDefault()
            cont++
            var campo = $('<div></div>', {class: 'w3-container', id: 'f'+cont})
            var descLabel = $('<label class="w3-cell"></label>')
            var descInput = $('<input/>', {class: 'w3-input w3-cell', type: "text", name: "query", placeholder: "Query"})
            $("#lista").append(campo)
            $("#f"+cont).append(descLabel, descInput)
            numQuery++;
        }
    })
    $('button').click(function(){
        $(this).hide();
        $(this).next.show();
    })
})
