function game() {
let titleplayer = document.querySelector("titleplayer");
let revanchaBoton = document.querySelector("revancha");
let items = document.querySelectorAll(".item");
let matrizArray = Array.from(items);
let tracking = [1,2,3,4,5,6,7,8,9,]
let jugadorActual = "jugadorX";


// Recorrer todos los elementos del tablero//
    items.forEach(item => {
    items.addEventListener("click" , (e) => {

 //movimiento del jugador//       
  let index = matrizArray.indexOf(e.target);
  items[index].classList.add("jugadorX");
  
  //movimiento de la lista del tracking []//
  let spliceNr = tracking.indexOf(index + 1);
  tracking.splice(spliceNr, 1);

  //check para el jugador que resulte ganador//
  if(wincheck("")){
    titleplayer.innerHTML = "jugadorX ganador"
  }

