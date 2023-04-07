const container = document.querySelector(".grille");
const affichage = document.querySelector("h3");
let resultats=0;
let toutesLesDivs;
let aliensInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20;

function creationGrilleEtAliens() {
  let indexAttr = 0;

  for (i = 0; i < 240; i++) {
    if (indexAttr === 0) {
      const bloc = document.createElement("div");
      bloc.setAttribute("data-left", "true");
      container.append(bloc);
      indexAttr++;
    } else if (indexAttr === 19) {
      const bloc = document.createElement("div");
      bloc.setAttribute("data-right", "true");
      container.append(bloc);
      indexAttr = 0;
    } else {
      const bloc = document.createElement("div");
      container.appendChild(bloc);
      indexAttr++;
    }
  }

  for (let i = 1; i < 53; i++) {
    if (i === 13) {
      i = 21;
      aliensInvaders.push(i);
    } else if (i === 33) {
      i = 41;
      aliensInvaders.push(i);
    } else {
      aliensInvaders.push(i);
    }
  }

  toutesLesDivs = document.querySelectorAll(".grille div");
  aliensInvaders.forEach((invader) => {
    toutesLesDivs[invader].classList.add("alien");
  });

  toutesLesDivs[tireurPosition].classList.add("tireur");
}

creationGrilleEtAliens();

function deplacerLeTireur(e) {
  toutesLesDivs[tireurPosition].classList.remove("tireur");

  if (e.keyCode === 37) {
    if (tireurPosition > 220) {
      tireurPosition -= 1;
    }
  }
  if (e.keyCode === 39) {
    if (tireurPosition < 239) {
      tireurPosition += 1;
    }
  }

  toutesLesDivs[tireurPosition].classList.add("tireur");
}

document.addEventListener("keydown", deplacerLeTireur);

// bouger les aliens

let descendreRight = true;
let descendreLeft = true;

function bougerLesAliens() {
  for (let i = 0; i < aliensInvaders.length; i++) {
    if (
      toutesLesDivs[aliensInvaders[i]].getAttribute("data-right") === "true"
    ) {
      if (descendreRight) {
        direction = 20;
        setTimeout(() => {
          descendreRight = false;
        }, 50);
      } else if (descendreRight === false) {
        direction = -1;
      }
    } else if (
      toutesLesDivs[aliensInvaders[i]].getAttribute("data-left") === "true"
    ) {
      if (descendreLeft) {
        direction = 20;
        setTimeout(() => {
          descendreLeft = false;
        }, 50);
      } else if (descendreLeft === false) {
        direction = 1;
      }
      descendreRight = true;
    }
  }

  for (let i = 0; i < aliensInvaders.length; i++) {
    toutesLesDivs[aliensInvaders[i]].classList.remove("alien");
  }
  for (let i = 0; i < aliensInvaders.length; i++) {
    aliensInvaders[i] += direction;
  }
  for (let i = 0; i < aliensInvaders.length; i++) {
    toutesLesDivs[aliensInvaders[i]].classList.add("alien");
  }

  if (toutesLesDivs[tireurPosition].classList.contains('alien','tireur')) {
    affichage.textContent="Game Over";
    toutesLesDivs[tireurPosition].classList.add('boom');
    clearInterval(invaderId);
  }

  for (let i = 0; i < aliensInvaders.length; i++) {
    if(alienInvaders[i]>toutesLesDivs.length-width){
        affichage.textContent='les aliens vous ont envahi';
        clearInterval(invaderId);
    }
    
  }
}

invaderId = setInterval(bougerLesAliens, 100);

// laser 

function tirer(e){
    let laserId;
    let laserEnCours=tireurPosition;

    function deplacementLaser(){
        toutesLesDivs[laserEnCours].classList.remove('laser');
        laserEnCours-= width;
        toutesLesDivs[laserEnCours].classList.add('laser');

        if (toutesLesDivs[laserEnCours].classList.contains('alien')) {
            toutesLesDivs[laserEnCours].classList.remove('laser');
            toutesLesDivs[laserEnCours].classList.remove('alien');
            toutesLesDivs[laserEnCours].classList.add('boom');

            aliensInvaders=aliensInvaders.filter(el=>el !=laserEnCours)

            setTimeout(()=> toutesLesDivs[laserEnCours].classList.remove('boom',250));
            clearInterval(laserId);

            resultats++;

            if(resultats===36){
                affichage.textContent="Bravo, c'est gagne !";
                clearInterval(invaderId);
            }else{
                affichage.textContent=`Scrore : ${resultats}`;
            }
        }


        if(laserEnCours<width){
            clearInterval(laserId);
            setTimeout(()=>{
                toutesLesDivs[laserEnCours].classList.remove('laser')
            },100)
        }

    }

    if(e.keyCode===32){
        laserId=setInterval(()=>{
            deplacementLaser();
        },100);
    }
}

document.addEventListener('keyup',tirer);
