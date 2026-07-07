import {} from "./utils.js"

const article = document.querySelector(".card")

const insertCard = (parkingSlot) => {
  const card = `<article class="card">
        <h2>${parkingSlot.typevoie} ${parkingSlot.nomvoie}</h2>
        <img src="" alt="PictoPlace"/>
        <dl>
          <dt>Type de place</dt>
          <dd>${parkingSlot.regpri}</dd>

          <dt>Disposition</dt>
          <dd>${parkingSlot.typsta}</dd>

          <dt>Longueur et largeur</dt>
          <dd>${parkingSlot.lon} mètre x ${parkingSlot.lar} mètre</dd>

          <dt>Nombre de place disponibles (Approx)</dt>
          <dd>${parkingSlot.plarel}</dd>
        </dl>
  </article>`
  article.insertAdjacentHTML("beforeend", card);
} ;

// --- Recuperation des donnés ---
fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100")
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    const dataArray = data.results;
    console.log(dataArray);
    const dataTotal = dataArray.length;
    
    dataArray.forEach(parkingSlot => {
      insertCard(parkingSlot);
    });

  // --- Ajout ID ---
    // const dataID = [];
    // for(let i = 0; i < dataArray.length;i++){
    //   dataID.push({...dataArray[i], id: i});
    // }


  })