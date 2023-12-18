let canvas=document.querySelector('canvas');
let ctx= canvas.getContext('2d');
let cellSize=50;
let snakecell=[[0,0]]
let direction='right';
let width=1400;
let height=650;
let gameover=false;
let count=0;
let foodCell= generateFood();





function draw(){

    if(gameover){
        ctx.fillStyle='red'
        ctx.font='80px san-sarif'
        ctx.fillText(`Game Over`,500,300)
        clearInterval(id)
        return;
    }
    ctx.clearRect(0,0,1400,650)
    for(let cell of snakecell){
        ctx.fillStyle='red'
        ctx.fillRect(cell[0],cell[1],cellSize,cellSize)
    }

      ctx.fillStyle='green'
        ctx.fillRect(foodCell[0],foodCell[1],cellSize,cellSize)

        ctx.font='35px san-sarif'
        ctx.fillText(`Score ${count}`,70,50)
}
// draw()

function update(){
     let headX= snakecell[snakecell.length-1][0];
     let headY= snakecell[snakecell.length-1][1];

     let newX
     let newY
     if(direction==='right'){
        newX=headX+cellSize;
        newY=headY;
        if(newX===width|| over(newX,newY)){
           gameover=true;
        }
     }
     else if(direction==='left'){
        newX=headX-cellSize;
        newY=headY;
        if(newX<0 || over(newX,newY)){
            gameover=true;
        }

     }
     else if(direction==='up'){
        newX=headX;
        newY=headY-cellSize;
        if(newY<0 || over(newX,newY)){
            gameover=true;
        }
     }
     else{
        newX=headX;
        newY=headY+cellSize;
        if(newY===height|| over(newX,newY)){
            gameover=true;
        }
     }
     snakecell.push([newX,newY]);
     if(newX===foodCell[0] && newY===foodCell[1] )
     {
        foodCell=generateFood();
        count++;
     }
     else{
     snakecell.shift()
     }
}



// update()
let id= setInterval(()=>{
    draw()
    update()
},200)

// ctx.fillRect(10,10,580,580);
document.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp'){
        direction='up';
    }
    else if(e.key==='ArrowDown'){
        direction='down';
    }
    else if(e.key==='ArrowRight'){
        direction='right';
    }
    else{
        direction='left';
    }
})
   
   
    // generate food
  function generateFood(){
    return([
       Math.round(Math.random()*(width-cellSize)/50)*50,
        Math.round(Math.random()*(height-cellSize)/50)*50        
    ])
  }
//   console.log(generateFood());


    function over(newX,newY){
        for(let item of snakecell){
            if(item[0]===newX && item[1]=== newY){
                return true;
            }
        }
                return false;
        
    }






