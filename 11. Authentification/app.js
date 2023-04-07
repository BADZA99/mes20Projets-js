const btnInscription = document.querySelector(".btn-inscription");
const btnConnection = document.querySelector(".btn-connection");
const btnDeconnection = document.querySelector(".btn-deco");
const formInscription = document.querySelector(".form-inscription");
const formConnection = document.querySelector(".form-connection");

const emailInscription = document.querySelector(".email-inscription");
const mdpInscription = document.querySelector(".mdp-inscription");

const emailconnection= document.querySelector(".email-connection");
const mdpconnection = document.querySelector(".mdp-connection");


btnInscription.addEventListener('click',()=>{
    if(formConnection.classList.contains('apparition')){
        formConnection.classList.remove('apparition');
    }
    formInscription.classList.toggle('apparition');
})

btnConnection.addEventListener('click',()=>{
     if (formInscription .classList.contains("apparition")) {
       formInscription .classList.remove("apparition");
     }
    formConnection.classList.toggle('apparition');
})

formInscription.addEventListener('submit',(e)=>{
    e.preventDefault();

    const mailValeur=emailInscription.value;
    const mdpInscriptionVeleur=mdpInscription.value;

    auth
      .createUserWithEmailAndPassword(mailValeur, mdpInscriptionVeleur)
      .then((cred) => {
        // console.log(cred);
        formInscription.reset();
        formInscription.classList.toggle('apparition');
      });


})


// deco

btnDeconnection.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        console.log('deconnecté');
    })

})

// connection 

formConnection.addEventListener("submit", (e) => {
  e.preventDefault();

  const mailValeur = emailconnection.value;
  const mdpConnectionVeleur = mdpconnection.value;

  auth
    .signInWithEmailAndPassword(mailValeur, mdpConnectionVeleur)
    .then((cred) => {
      console.log('CONNECTION',cred.user);
      formConnection.reset();
      formConnection.classList.toggle("apparition");
    });
});


// gerer le contenu 

const h1=document.querySelector('h1');
const info=document.querySelector('.info');

// onAuthStateChanged permet de savoir si un user est connecte ou pas.
auth.onAuthStateChanged(utilisateur=>{

    if(utilisateur){
        info.innerText="voici le contenu prive";
        h1.innerText="vous voila de retour";
    }else{
        console.log("utilistaeur s'est deconnecté ");
        info.innerText="bienvenue, inscrivez-vous ou connectez-vous"
    }

})