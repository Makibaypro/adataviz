import {formaterData, cardSwitch, displayCard, filter } from "./utils.js"

const btnLeft = document.querySelector(".buttonLeft");
const btnRight = document.querySelector(".buttonRight");
const btnFilter = document.querySelector(".filterBTN");
const resultsAmount = document.querySelector(".resultAmount");
const searchBar = document.querySelector(".searchBar");
const filterPanel = document.querySelector(".filterPanel");
const rail = document.querySelector(".cardsGRP");
const link = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100";

let centerValue = 0;
let dataTotal = 0;
btnLeft.disabled = true;
let centerCard = null;
let dataGlobal = [];
let research = "";






const main = async () => {
  const data = await formaterData(link);

  resultsAmount.textContent = `Résultats trouvés : ${data.total}`;
  dataTotal = data.total;
  dataGlobal = data.array;

  displayCard(data);
  const cards = document.querySelectorAll(".card");
  centerCard = document.querySelector(`[data-id="${centerValue}"]`);
  console.log(research)

  cardSwitch(centerValue, rail, centerCard);
  


}



// --- On appel la fonction.
main();












searchBar.addEventListener("input", event => {
    research = event.target.value;
})

btnFilter.addEventListener("click", () => {
  filterPanel.classList.toggle("cache");
})

btnLeft.addEventListener("click", () => {
  if (centerValue > 0) {
    centerValue -= 1;
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    btnRight.disabled = false;
  }
  if (centerValue === 0) btnLeft.disabled = true;

  console.log(centerValue);
});

btnRight.addEventListener("click", () => {
  if (centerValue < dataTotal - 1) {
    centerValue += 1;
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    btnLeft.disabled = false;
  }
  if (centerValue === dataTotal - 1) btnRight.disabled = true;

  console.log(centerValue);
});