
var http = require('http');
var fs = require('fs');
var hoy = new Date();

//Vector que va a almacenar a los usurios registrados
var usuarios = [];
var venticas = ["."];

fs.readFile("Usuario.json",cargarUsuarios);

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
fs.readFile("ventas.json",cargarVentas);
function cargarVentas(error,data){
    if(error==null){
        venticas = JSON.parse(data); //Destr
        console.log("Las ventas son");
        console.log(venticas);
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
  else if(request.url=='/registrar'){
        guardarRegistro(request,response);
    }

  //Verifica la existencia de un usuario
  else if(request.url=='/login'){
        login(request,response);
  }
//Guarda los posibles productos a vender.
  else if(request.url=='/ventas'){
    guardarVentas(request,response);

  }

}
//Guardar las ventas en el momento
function guardarVentas(request,response){
  //Programar el callBack
  request.on("data",recibir);
  function recibir(data){
    console.log(data.toString());
    var ven = JSON.parse(data.toString());
    //Agregar al vector
    venticas.push(ven);
    //console.log(ven);
    fs.writeFile('ventas.json',JSON.stringify(ven),null);
    response.end("Guardando venta");
  }
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

        var estado = false;

        //Verifica que el usuario no se haya registrado anteriormente
        for(var i = 0; i < usuarios.length; i++){
          if(usuarios[i].cedula == usr.cedula && usuarios[i].cel == usr.cel && usuarios[i].telefono == usr.telefono &&
             usuarios[i].correo == usr.correo){

               var resp = {};
               //Envia una respuesta
               resp.estado = 'Este usuario ya existe en nuestra pagina web';
               estado = true;
               response.end(JSON.stringify(resp));
          }
        }
        //Si no se registro anteriormente procede a guardarlo en el archivo JSON y a pasar a la siguiente pagina
        if(estado == false){
        usuarios.push(usr);
        console.log(usuarios);
        fs.writeFile('usuario.json',JSON.stringify(usuarios),null);
        var resp = {};
        resp.estado = 'Usuario registrado satisfactoriamente';
        resp.url = '/gustosA.html';
        response.end(JSON.stringify(resp));
      }
    }
}

//verifica la existencia de un usuario en el archivo JSON
function login(request,response){
  request.on("data",recibir);

  function recibir(data) {
    var usr = JSON.parse( data.toString() );
    //Realiza la busqueda en el arhivo JSON
    for(var i = 0; i < usuarios.length; i++){
      if(usuarios[i].correo == usr.correo && usuarios[i].contrasena == usr.contrasena){
        //El usuario y la clave son correctos
        //Retornamos la respuesta

        var resp = {};
        resp.estado = 'OK';
        resp.url = '/profileR.html';
        //Enviar cookie al navegador
        response.writeHead(200,{
          'Set-cookie':  'the-cookie'
        });
        //Serializar el objeto y enviar de vuelta al navegador
        response.end(JSON.stringify(resp));
        return;

      }
  }


  //Si llega aqui, es porque no coincide con ninguno
  var resp = {};
  resp.estado ='login incorrecto';
  response.end(JSON.stringify(resp));
  //Retornar un error

  }

}
