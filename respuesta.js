
var http = require('http');
var fs = require('fs');
var hoy = new Date();
//Crear una instacncia del servidor HTTP
var server = http.createServer(atenderServidor);
console.log('servidor iniciado');


//Iniciar la escucha del servidor en el puerto 8088
server.listen(8088);

//coffeScript o typeScript
function atenderServidor(request, response){
  var path = request.url;
  retornarArchivo(request,response,path.substr(1));
  console.log('petición recibida : ' + path);


}

function retornarArchivo(request,response,archivoAleer){

  fs.readFile(archivoAleer,archivoListo);

  function archivoListo(error,data){
    if(error==null){
      response.write(data);
      response.end();
    }else {
        console.log(error);
        response.end(error.toString());
    }
  }
}

function leerArchivos(){
  fs.readdir(".",listaDeArchivos);
  function listaDeArchivos(error,lista){

    if(error) {
      throw error;
      response.end(error);
    }
    for (var i = 0; i < lista.length; i++) {
      //console.log(lista[i]);
    }
  }
  return retorno;
}
