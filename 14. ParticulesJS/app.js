const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
ctx.canvas.width=window.innerWidth;
ctx.canvas.height=window.innerHeight;
let particulesTab;

class Particule{
    constructor(x,y,directionX,directionY,taille,couleur){
        this.x=x;
        this.y=y;
        this.directionX=directionX;
        this.directionY=directionY;
        this.taille=taille;
        this.couleur=couleur;
    }

    dessine(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.taille,0,Math.PI*2,false);
        ctx.fillStyle=this.couleur;
        ctx.fill();
    }

    MAJ(){
      // si on touche les cotes on change de direction

      if (this.x + this.taille > canvas.width || this.x - this.taille < 0) {
        this.directionX = -this.directionX;
      }
      // si on touche le plafon ou le bas  on change de direction
      if (this.y + this.taille > canvas.height || this.y - this.taille < 0) {
        this.directionY = -this.directionY;
      }
      this.x+=this.directionX
      this.y+=this.directionY
      this.dessine();
  }
    }


// const obj1=new Particule(100,100,50,50,100,'white');
// obj1.dessine();
// console.log(obj1);

function init(){
    particulesTab=[];
    for (let i = 0; i < 100; i++) {
        let taille=(Math.random()+0.01)*20;
        let x=Math.random()*(window.innerWidth-taille*2);
        let y=Math.random()*(window.innerHeight-taille*2);
        let directionX=(Math.random()*0.4)-0.2;
        let directionY=(Math.random()*0.4)-0.2;
        let couleur="white";

        particulesTab.push(new Particule(x,y,directionX,directionY,taille,couleur));
        
    }
}

function animation(){
  // requestAnimationFrame execute une fonction 60 fois par seconde (60fps)
  requestAnimationFrame(animation);
  //   clearRect nettoie un rectangle
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particulesTab.length; i++) {
    particulesTab[i].MAJ();
    
  }
}

init();
animation();

function resize(){
   init();
   animation(); 
}

let doit;
window.addEventListener('resize',()=>{
    clearTimeout(doit);
    doit=setTimeout(resize,100);
    ctx.canvas.width=window.innerWidth;
    ctx.canvas.height=window.innerHeight;

})