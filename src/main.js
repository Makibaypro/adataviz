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


const centerCard = document.querySelector(`[data-id="${centerValue}"]`);




const main = async () => {

  displayCard(link);
  cardSwitch(centerValue, rail, centerCard);
  


}

formaterData("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100")
  .then(data => {
    dataTotal = data.total;
    // resultsAmount.textContent = `Résultats trouvés : ${dataTotal}`;
    // cardSwitch(centerValue);
  });


main();












searchBar.addEventListener("input", event => {
  filter(event.target.value);
})

btnFilter.addEventListener("click", () => {
  filterPanel.classList.toggle("cache");
})

btnLeft.addEventListener("click", () => {
  if (centerValue > 0) {
    centerValue -= 1;
    cardSwitch(centerValue);
    btnRight.disabled = false;
  }
  if (centerValue === 0) btnLeft.disabled = true;
});

btnRight.addEventListener("click", () => {
  if (centerValue < dataTotal - 1) {
    centerValue += 1;
    cardSwitch(centerValue);
    btnLeft.disabled = false;
  }
  if (centerValue === dataTotal - 1) btnRight.disabled = true;
});