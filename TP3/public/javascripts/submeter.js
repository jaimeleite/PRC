$(document).ready(function(){
    $("#submeter").click(function(){
        var query = $("#query").val()
        var repositorio = $("#repositorio").val()
        var link = genLink + repositorio + '?query=' 
        var encoded = encodeURIComponent(prefixes + query)
        axios.get('http://localhost:3000/query?query=' + link + encoded)
            .then(function(dados){
                d = JSON.stringify(dados.data)
                $("#results").val(d);
            })
            .catch(function(error){
                $("#results").val(error);
            })
        //alert(link + encoded);
        //$("#results").val(link + encoded);
    });
  });