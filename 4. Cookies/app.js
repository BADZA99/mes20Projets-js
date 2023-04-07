const affichage=document.querySelector('.affichage');
const btns=document.querySelectorAll('button');
const inputs=document.querySelectorAll('input');
const infoTxt=document.querySelector('.info-txt');

const today =new Date();
// console.log(today.getTime());
// pour convertir today a la date dans une semaine en ms
// gettime() donne la date en milliseconde
const nextWeek=new Date(today.getTime()+7*24*60*1000);
// convertir nextweek en chaine en le concatenant avec 'O' et le decouper a partir de l'indice 9 ET 11 exclu
let day=('0'+nextWeek).slice(9,11);
// slice(-2) pour decouper la caine a partir de la fin
let month=('0'+(today.getMonth()+1)).slice(-2);
let year=today.getFullYear();
document.querySelector('input[type=date]').value=`${year}-${month}-${day}`;



btns.forEach(btn =>{
    btn.addEventListener('click',btnAction);
});

function btnAction(e){
    let nvObj={};

    inputs.forEach(input=>{
        let attrName=input.getAttribute('name');
        let attrValeur= attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName]=attrValeur;
    })
    // console.log(nvObj);
    let description=e.target.getAttribute('data-cookie');

    if(description==="creer"){
        creerCookie(nvObj.cookieName,nvObj.cookieValue,nvObj.cookieExpire);
    }else if(description==="toutAfficher"){
        listeCookies();
    }
}

function creerCookie(name, value, exp) {
  infoTxt.innerText = "";

  // si le cookie n'a pas de nom
  if (name.length == 0) {
    infoTxt.innerText = `Impossible de definir un cookie sans nom`;
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )};expires=${exp.toUTCString()}`;
  console.log(document.cookie);

  let info = document.createElement("li");
  info.innerText = `cookie ${name} créé.`;
  affichage.appendChild(info);
  setTimeout(() => {
    info.remove();
  }, 1500);
}
