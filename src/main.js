import {formaterData} from "./utils.js"

const btnLeft = document.querySelector(".buttonLeft");
const btnRight = document.querySelector(".buttonRight");

let centerValue = 0;

formaterData("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100");




/*
// === Gestion des ID de cartes pour affichages ---
if (appelId < 0) {
  appelId *= -1;
  centerId = 100 - (appelId % 100);
} else if (appelId % 100 === 0) {   // <- pas appelId === 0
  centerId = 100;
} else {
  centerId = appelId % 100;
}
*/


btnLeft.addEventListener("click", () => {
  centerValue -= 1;
  console.log(centerValue);
})

btnRight.addEventListener("click", () => {
  centerValue += 1;
  console.log(centerValue);
})