const canvas =document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const affichageScrore=document.querySelector('.score');

const rayonBalle=10,barreheight=10,barreWidth=75,nbCol=8,nbRow=5,largeurBrique=75,hauteurBrique=20;

let x=canvas.width/2,y=canvas.height-30,barreX=(canvas.width-barreWidth)/2,fin=false,vitesseX=5,vitesseY=-5,score=0;

function dessineBalle(){
    ctx.beginPath();
    ctx.arc(x,y,rayonBalle,0,Math.PI*2);
    ctx.fillStyle="#333";
    ctx.fill();
    ctx.closePath();

}

// dessineBalle();

function dessineBarre() {
  ctx.beginPath();
  ctx.rect(barreX, canvas.height - barreheight-2,barreWidth,barreheight);
  ctx.fillStyle = "#333";
  ctx.fill();
  ctx.closePath();
}

// dessineBarre();


// tableau avec toutes les briques

const briques=[];

for (let i = 0; i < nbRow; i++) {
    briques[i]=[];

    for (let j = 0; j < nbCol; j++) {
        briques[i][j]={x: 0,y:0,statut:1};
        
    }
    
}

// console.log(briques);

function dessineBriques(){
    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
          
            // 75*8+10*8+35=750 la largeur du canvas
            if (briques[i][j].statut===1) {
                let briqueX=(j*(largeurBrique+10)+35);
                let briqueY=(i*(hauteurBrique+10)+30);

                briques[i][j].x=briqueX;
                briques[i][j].y=briqueY;

                ctx.beginPath();
                ctx.rect(briqueX,briqueY,largeurBrique,hauteurBrique);
                ctx.fillStyle='#333';
                ctx.fill();
                ctx.closePath();
            }
        }
        
    }
}

// dessineBriques();

function dessine(){
    if(fin===false){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        dessineBriques();
        dessineBalle();
        dessineBarre();
        collisionDetection();

        if (x+vitesseX>canvas.width - rayonBalle || x+vitesseX<rayonBalle) {
            vitesseX=-vitesseX;
        }
        if (y+vitesseY<rayonBalle) {
            vitesseY=-vitesseY
        }
        
        if (y + vitesseY > canvas.height - rayonBalle) {
            // faire rebondir la balle sur la barre
            if (x>barreX && x<barreX+barreWidth) {
                vitesseX=vitesseX+0.1;
                vitesseY=vitesseY+0.1;

                vitesseY=-vitesseY;
            }
            else{
                fin=true;
                affichageScrore.innerHTML=`Perdu ! <br> clique sur le casse-briques pour recommencer.`
            }

        }


        x+=vitesseX;
        y+=vitesseY;

        requestAnimationFrame(dessine);
    }

}

dessine();

function collisionDetection(){

    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            let b=briques[i][j];

            if(b.statut===1){
                if(x>b.x && x<b.x + largeurBrique && y>b.y && y<b.y+hauteurBrique){
                    vitesseY=-vitesseY;
                    b.statut=0;

                    score++;
                    affichageScrore.innerHTML=`score: ${score}`;

                    if(score===nbCol*nbRow){
                        affichageScrore.innerHTML = `Bravo! : <br> clique sur le casse-briques pour recommencer.`;
                        fin=true;
                    }
                }
            }
            
        }
        
    }
}

// mouvement de la barre

document.addEventListener('mousemove',mouvementSouris);

function mouvementSouris(e){
    let posXBarreCanvas=e.clientX-canvas.offsetLeft;
    // e.clientX=de la gauche until la 
    // canvas.offsetLeft= decalage par rapport a la gauxhe

    if(posXBarreCanvas>35 && posXBarreCanvas<canvas.width-35){
        barreX=posXBarreCanvas-barreWidth/2;
    }
    

}

// RECOMMENCER 

canvas.addEventListener('click',()=>{
    if(fin===true){
        fin=false;
        document.location.reload();
    }
})

