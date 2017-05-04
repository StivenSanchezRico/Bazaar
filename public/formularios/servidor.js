
var http = require('http');
var fs = require('fs');
var hoy = new Date();

//Vector que va a almacenar a los usurios registrados
var usuarios = [];

var lecturaDatos = fs.readFile("Usuario.json",cargarUsuarios);
//Funcion que permite observar que usuarios se
// encuentran en la base de datos
function cargarUsuarios(error,data){
    if(error==null){
        usuarios = JSON.parse(data); //Destr
        console.log("Los usurios registrados son");
        console.log(usuarios);
    }else{
        console.log(error);
        response.end(error.toString());
    }
}

//Crear una instacncia del servidor HTTP
var server = http.createServer(atenderServidor);
console.log('servidor iniciado');
leerArchivos();



//Iniciar la escucha del servidor en el puerto 8088
server.listen(8088);
//server.listen(process.env.PORT || 5000);

//coffeScript o typeScript
function atenderServidor(request, response){
  var path = request.url;
  retornarArchivo(request,response,path.substr(1));
  console.log('petición recibida : ' + path);
    if(request.url=='/statu.json'){
        retornarArchivo(request,response,path.substr(1));
    }
    //Almacena los datos del usuario
    if(request.url=='/registrar'){
        guardarRegistro(request,response);
    }

  //leerArchivos(request.url);


}

function retornarEncicla(request,response){
    http.get("http://www.encicla.gov.co/status/",pipe)
    //Procesa la respuesta de http
    function pipe(res){
        var body="";
        res.on("data",recibir);
        res.on("end",terminar);
        function recibir(data){
            body+= data;
        }

        function terminar(data){
            response.end(body);
        }
    }
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
      console.log(lista[i]);
    }
  }

}



//Guardar el registro de un usuario.
function guardarRegistro(request,response){
    //Programar el callBack
    request.on("data",recibir);
    //callBack que recibe el cuerpo del POST
    function recibir(data){
        console.log(data.toString());
        var usr = JSON.parse(data.toString());
        //Agregar al vector
        usuarios.push(usr);
        response.end("Ya recibimos el usurio");
        console.log(usuarios);
        fs.writeFile('usuario.json',JSON.stringify(usuarios),null);
    }
}
