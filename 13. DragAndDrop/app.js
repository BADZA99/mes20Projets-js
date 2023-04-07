let base=document.querySelector('.base');
const premiereCase=document.getElementById('premiere-case');
const boxs=document.querySelectorAll('.case');
const destroy=document.querySelector('.destroy');
const allCases=[];
const choix=[];
let photoEnCours;



for (let i = 0; i < boxs.length; i++) {
    allCases.push(boxs[i]); 
}
allCases.push(destroy);
let indexPhoto=1;

// sur le cite https://loremflickr.com/
base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;

function nvBase(){
    const newBase=document.createElement('div');
    newBase.setAttribute('class','base');
    newBase.setAttribute('draggable','true');
    indexPhoto++;
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    premiereCase.appendChild(newBase);
    base=newBase;

}


for(const vide of allCases){
    // dragover c quand on survole un element avec un element pris avec le clic de la souris
    // dragenter c quand on rentre dans l'espace aerien d'un element
    // dragenter c quand on lache quelque chose dedans.
    vide.addEventListener('dragover',dragOver);
    vide.addEventListener('dragenter',dragEnter);
    vide.addEventListener('drop',dragDrop);
}


function dragDrop(){

    if(this.id==='premiere-case'){
        return
    }

    // destroy
    if (this.id === "destroy") {
     base.remove();
     nvBase();
     return;
    }


    // verouillage
    this.removeEventListener('drop',dragDrop);
    this.removeEventListener('dragenter',dragEnter);
    this.removeEventListener('dragover',dragOver);

    

    this.appendChild(base);
    // enlever le drag sur l'image on pourra plus la bouegr
    this.childNodes[0].setAttribute('draggable',false);
    nvBase();

    choix.push(photoEnCours);

    if (choix.length===3) {
        setTimeout(()=>{
            alert('selection termine');
        },200)
    }
}
// autoriser le drop sur les elements
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}