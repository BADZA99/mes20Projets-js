const CLEAPI = "dd4aba81358afcc60da910fb6815fd54";
let resultatsAPI;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // console.log(position);

      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      AppelAPI(long, lat);
    },
    () => {
      alert(
        "vous avez refusé la geolocalistion sur votre navigateur veuiller l'activer"
      );
    }
  );
}

function AppelAPI(long, lat) {
  // console.log(long,lat);
  fetch(
    // `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
    //   exclude pour demander ce qu'on veut eliminer (les minutes ici)
    // fetch est une promesse va se resoudre l'orsque notre requete sera effetue et que les donnees seront presentes une fois que c fait une autre promesse (then() ici) va retourner le resultat de l'api sous format json
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      console.log(data);
    });
}
