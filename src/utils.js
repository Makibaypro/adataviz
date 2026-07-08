


// Liens site : https://opendata.paris.fr/explore/dataset/stationnement-sur-voie-publique-emprises/information/?disjunctive.regpri&disjunctive.regpar&disjunctive.typsta&disjunctive.arrond&disjunctive.locsta&disjunctive.zoneres&disjunctive.parite&disjunctive.signhor&disjunctive.signvert&disjunctive.confsign&disjunctive.typemob&sort=-regpri&basemap=jawg.dark&location=19,48.88298,2.38301
// API : https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100

const section = document.querySelector(".cardsGRP");



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
  if(parkingSlot.regpri === "2 ROUES") img = "./src/assets/motorcycle.png";
  if(parkingSlot.regpri === "GIG/GIC") img = "./src/assets/wheelChair.png"

  let card = `<article class="card">
        <h2>${parkingSlot.typevoie} ${parkingSlot.nomvoie}</h2>
        <img src="${img}" alt="PictoPlace" class="imgSide"/>
        <dl class="infos" >
          <dt class="infosType" >Type de place</dt>
          <dd>${parkingSlot.regpri}</dd>

          <dt class="infosType" >Disposition</dt>
          <dd>${parkingSlot.typsta}</dd>

          <dt class="infosType" >Longueur et largeur</dt>
          <dd>${parkingSlot.lon} mètre x ${parkingSlot.lar} mètre</dd>

          <dt class="infosType" >Nb. de place (Approx)</dt>
          <dd>${parkingSlot.plarel}</dd>
        </dl>
  </article>`
  section.insertAdjacentHTML("beforeend", card);
};

const displayCardCenter = (cardId) => {
  card.classList.add(".center");
  card.classList.remove(".left");
  card.classList.remove(".right");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("hider");
}

const addLeft = (cardId) => {
  card.classList.add(".left");
  card.classList.remove(".center");
  card.classList.remove(".right");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("hider");
}

const addLeftOut = (cardId) => {
  card.classList.add(".leftOut");
  card.classList.remove(".center");
  card.classList.remove(".right");
  card.classList.remove("rightOut");
  card.classList.remove("left");
  card.classList.remove("hider");
}

const addRight = (cardId) => {
  card.classList.add(".right");
  card.classList.remove(".left");
  card.classList.remove(".center");
  card.classList.remove("rightOut");
  card.classList.remove("leftOut");
  card.classList.remove("hider");
}

const addRightOut = (cardId) => {
  card.classList.add(".rightOut");
  card.classList.remove(".left");
  card.classList.remove(".center");
  card.classList.remove("right");
  card.classList.remove("leftOut");
  card.classList.remove("hider");
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
  } catch (error){
    console.error(error.message);
  }
}
