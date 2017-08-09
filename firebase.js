// Initialize Firebase
var config = {
  apiKey: "AIzaSyCxNl7FKKXcKQWtel9zcqbUgdIq6GPTQfg",
  authDomain: "recommendationsreact.firebaseapp.com",
  databaseURL: "https://recommendationsreact.firebaseio.com",
  projectId: "recommendationsreact",
  storageBucket: "recommendationsreact.appspot.com",
  messagingSenderId: "1018583225121"
};
firebase.initializeApp(config);


  (function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $('#iniciar').hide()
        $('#iniciado').show()
        $('#nombre').text('Hola '+user.displayName)
        $('#foto').attr('src',user.photoURL)
      } else {
        $('#iniciar').show()
        $('#iniciado').hide()
      }
    });

    var db = firebase.database().ref('mensajes')
    db.on('child_added', function(snapshot){
      var mensajes = snapshot.val()
      console.log(mensajes)
      $('#chat').append('<div><img style="width:100px; height:100px;" src="'+mensajes.foto+'"/> ==>'+mensajes.mensaje+'</div>')
    })
  })();




//guardar en firebase
function enviar(){
  var db = firebase.database().ref('mensajes')
  var mensaje = $('#mensaje').val()
  var usuario = firebase.auth().currentUser
  db.push({
    mensaje:mensaje,
    usuario:usuario.displayName,
    foto:usuario.photoURL
  })
  $('#mensaje').val('')
  
}
$('#enviar').on('click',function(){
enviar()
})
$(document).keypress(function(e) {
    if(e.which == 13) {
       enviar()
    }
});
//Login w/google
$('#google').on('click', function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log(result.user)
  })
})
//cerrar s
$('#cerrar').on('click', function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    $('#iniciado').hide()
    $('#iniciar').show()
 
  });
})

