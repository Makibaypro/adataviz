import {formaterData, cardSwitch, displayCard, filtre } from "./utils.js"

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
let dataGlobal = {};
let dataFiltered = []
let research = "";






const main = async () => {
  dataGlobal = await formaterData(link);

  resultsAmount.textContent = `Résultats trouvés : ${dataGlobal.total}`;
  dataTotal = dataGlobal.total;

  
  displayCard(dataGlobal, rail);
  const cards = document.querySelectorAll(".card");
  centerCard = document.querySelector(`[data-id="${centerValue}"]`);

  cardSwitch(centerValue, rail, centerCard);
  


}



// --- On appel la fonction.
main();












searchBar.addEventListener("input", event => {
    research = event.target.value;
    dataFiltered = filtre(dataGlobal, research);
    rail.innerHTML = "";
    centerValue = 0;
    displayCard(dataFiltered, rail);
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    dataTotal = dataFiltered.total;
    resultsAmount.textContent = `Résultats trouvés : ${dataTotal}`;
    btnLeft.disabled = (centerValue === 0);
    btnRight.disabled = ( centerValue === dataTotal - 1);
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
    btnLeft.disabled = (centerValue === 0);

});

btnRight.addEventListener("click", () => {
  if (centerValue < dataTotal - 1) {
    centerValue += 1;
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    btnLeft.disabled = false;
  }
    btnRight.disabled = (centerValue === dataTotal - 1);

});