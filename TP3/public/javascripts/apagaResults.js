function apagaResultados(){
    console.log("Estou na função de apagar os resultados")
    axios.delete('/resultados')
        .then(response=> window.location.assign('/'))
        .catch(error => console.log(error))
}