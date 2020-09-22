
const urlDatos = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json'






function renderProductos(){

}





function cargaInicial(){


    fetch(urlDatos).then((response)=> response.json() ).then((json)=> {
        datos = json

        getProductosPorTipo
        renderProductos(datos)
    })

}


function getProductosPorTipo(tipo){

    for(elem of datos){
        if(elem.name === tipo){
            return elem;
        }
    }

}