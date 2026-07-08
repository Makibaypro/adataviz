


// Liens site : https://opendata.paris.fr/explore/dataset/stationnement-sur-voie-publique-emprises/information/?disjunctive.regpri&disjunctive.regpar&disjunctive.typsta&disjunctive.arrond&disjunctive.locsta&disjunctive.zoneres&disjunctive.parite&disjunctive.signhor&disjunctive.signvert&disjunctive.confsign&disjunctive.typemob&sort=-regpri&basemap=jawg.dark&location=19,48.88298,2.38301
// API : https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100

const cardsGRP = document.querySelector(".cardsGRP");



// --- FONCTIONS ---

const addID = (dataArray) => {
  const dataID = [];
  for(let i = 0; i < dataArray.length;i++){
    dataID.push({...dataArray[i], id: i});
  }
  return dataID;
}

const insertCard = (parkingSlot) => {
  let img = "";
  if(parkingSlot.regpri === "LIVRAISON") img = "./src/assets/truck.png";
  else if(parkingSlot.regpri === "2 ROUES") img = "./src/assets/motorcycle.png";
  else if(parkingSlot.regpri === "GIG/GIC") img = "./src/assets/wheelChair.png"
  else if(parkingSlot.regpri === "PAYANT MIXTE" || parkingSlot.regpri === "PAYANT ROTATIF") img = "./src/assets/car.png";
  else if(parkingSlot.regpri === "AUTRE REGIME") img = "./src/assets/car.png";

  let card = `<article class="card cache" data-id="${parkingSlot.id}">
        <h2>${parkingSlot.typevoie} ${parkingSlot.nomvoie}</h2>
        <img src="${img}" alt="PictoPlace" class="imgSide"/>
        <dl class="infos" >
          <dt class="infosType" >Type de place</dt>
          <dd class="infosData">${parkingSlot.regpri}</dd>

          <dt class="infosType" >Disposition</dt>
          <dd class="infosData">${parkingSlot.typsta}</dd>

          <dt class="infosType" >Longueur</dt>
          <dd class="infosData">${parkingSlot.lon.toFixed(2)} mètre</dd>

          <dt class="infosType" >Largeur</dt>
          <dd class="infosData">${parkingSlot.lar} mètre</dd>

          <dt class="infosType" >Nb. de place (Approx)</dt>
          <dd class="infosData">${parkingSlot.plarel}</dd>
        </dl>
  </article>`
  cardsGRP.insertAdjacentHTML("beforeend", card);
};

// --- Fonction affichage ---
const displayCardCenter = (card) => {
  card.classList.add("center");
  card.classList.remove("left");
  card.classList.remove("right");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("cache");
}

const addLeft = (card) => {
  card.classList.add("left");
  card.classList.remove("center");
  card.classList.remove("right");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("cache");
}

const addLeftOut = (card) => {
  card.classList.add("leftOut");
  card.classList.remove("center");
  card.classList.remove("right");
  card.classList.remove("rightOut");
  card.classList.remove("left");
  card.classList.add("cache");
}

const addRight = (card) => {
  card.classList.add("right");
  card.classList.remove("left");
  card.classList.remove("center");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("cache");
}

const addRightOut = (card) => {
  card.classList.add("rightOut");
  card.classList.remove("left");
  card.classList.remove("center");
  card.classList.remove("right");
  card.classList.remove("leftOut");
  card.classList.add("cache");
}

export const dataTotal = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    const dataArray = data.results;
    const dataTotal = dataArray.length;
  } catch (error){
    console.error(error.message);
  }
  return console.log(dataTotal);
}

//--- Fonction Selection Card ---
export const cardSwitch = (centerValue, dataTotal) => {
  let centerId = 3;
if (centerValue < 0) {
  centerValue *= -1;
  centerId = dataTotal - (centerValue % dataTotal);
} else if (centerValue % dataTotal === 0) {
  centerId = dataTotal;
} else {
  centerId = centerValue % dataTotal;
}

let cardCenter = document.querySelector(`[data-id="${centerId}"]`);
let cardLeft = document.querySelector(`[data-id="${centerId-1}"]`);
let cardLeftOut = document.querySelector(`[data-id="${centerId-2}"]`);
let cardRight = document.querySelector(`[data-id="${centerId+1}"]`);
let cardRightOut = document.querySelector(`[data-id="${centerId+2}"]`);
displayCardCenter(cardCenter);
addLeft(cardLeft);
addLeftOut(cardLeftOut);
addRight(cardRight);
addRightOut(cardRightOut);
}

// --- Recuperation des donnés ---
export const formaterData = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    console.log("data :" + data);

    const dataArray = data.results;
    console.log("dataArray :" + dataArray);

    const dataTotal = dataArray.length;

    const dataFinal = addID(dataArray);
    console.log("dataID :" + dataFinal[2].id);

    dataFinal.forEach(parkingSlot => {
      insertCard(parkingSlot);
    });

    return dataTotal
  } catch (error){
    console.error(error.message);
  }
}
