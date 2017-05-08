function salir(){
    var request = new XMLHttpRequest();
  request.open("POST","/salir",false);
  request.send();
  window.location.href = '/HomeS.html';
}
