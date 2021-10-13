window.onload = function(){ 
getId() };

var d_arr=["<img src='https://i.ibb.co/tJLvmmT/dice-152173-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/vmrv769/dice-152174-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/TrnZjBj/dice-152175-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/pKwQCVL/dice-152176-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/HVDjx77/dice-152177-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/7p6j2F5/dice-152178-1280.png' height='70px' width='70px'/>","<img src='https://i.ibb.co/7p6j2F5/dice-152178-1280.png' height='70px' width='70px'/>"];

var interval ;
var time = 0;
var p = 1;
var di= 0;
var cell = [];
var coin = [];
var cn = [];
var win = [0,0,0,0,0];
var isActive = false;

function diceBtn() {       //dice function
 if(isActive==true){
  if(time==0){ 
  interval = setInterval( function(){     
  if(time < 15000){
    time += 100;
 var i = Math.floor(Math.random()*d_arr.length );
 if(i==6){
     di=i;
 }else{
     di =i+1;
 }
document.getElementById("dice").innerHTML  = d_arr[i];
 }else {  
      clearInterval(interval);
      selectCoin();
    }
   }, time);   
  }      
 }
}

function getId(){    
    var form = document.querySelector("form");                        
    form.addEventListener("submit", (event)=>{ 
    var data = new FormData(form); 
    for (const entry of data) {
    selectPlr(entry[1]);
    }
    event.preventDefault(); }, false);  

    for (let i=1;i<=52;i++){  //get cells
        cell[i]= document.getElementById("c"+i);
    }
    for(let i=1,c=61;i<=4;i++,c++){
    for(let j=1;j<=6;j++){
    var t=c.toString();
     cell[t+j]=document.getElementById("p"+i+j);
      }
    }
    
    for(let i=1;i<=4;i++){    //creat coins
       cn[i] = [];
    for(let j=1;j<=4;j++){ 
       cn[i][j]=document.createElement("div");
       cn[i][j].className="coin";
       cn[i][j].id="coin"+i+j;
     }
    }    
    
    for(var i=1,c=2;i<=4;i++){//init coins velue
      coin[i] = [];
    for(var j=1;j<=4;j++){     
      coin[i][j] = { 
      h:document.getElementById("p"+i+"h"+j),
      i: 0,
      c: c, 
      s: 0,
      w: 0,
      n: cn[i][j]
      }
    }
    c+=13;  
  }
  
  for(let i=1;i<=4;i++){   //set home coins
    for(let j=1;j<=4;j++){  
       coin[i][j].h.appendChild(cn[i][j]);      
      }    
   }   
}

function removeElem(id) {  //replace coins
var elem = document.getElementById(id); 
return elem.parentNode.removeChild(elem); 
}

function selectCoin(){
var x=1;
var s=0;
var r=0;

if(win[p]==0){             //init moveables
  for(let i=1;i<=4;i++){    
      s=coin[p][i].s+s;
  var t = coin[p][i].i + di;
    if(coin[p][i].s==1 && t<57){
      r=coin[p][i].s+r;
    }
      t = 0;
  }
  
// Select Conditions //

  if(s==0 && di==6){        //1
     x=1;
    coinMove(x);
  }else if((r==1 && di!=6) || (s==4 && r==1 && di==6)){                     //2
    for(let i=1;i<=4;i++){
    var t = coin[p][i].i + di;
      if(coin[p][i].s==1 && t<57){
        x=i;
     }
        t = 0;
    }
    coinMove(x);
  }else if((r==0 && s==4) || (r==0 && di!=6)){   //3
    passOut();
  }else if(s>=1 || di==6){  //4
   for(let i=1;i<=4;i++){
    var t = coin[p][i].i + di;
    var c = document.createElement("div");
        c.className="cn";
        c.id="cn"+p;
  if(di==6){
  if(coin[p][i].s==1 && coin[p][i].w==0 && t<57){
    removeElem("coin"+p+i);
    cell[coin[p][i].c].appendChild(c);
    c.onclick= function(){
    cell[coin[p][i].c].innerHTML="";
    coinMove(i);   
    }} 
  if(coin[p][i].s==0 && coin[p][i].w==0){
    coin[p][i].h.innerHTML="";
    coin[p][i].h.appendChild(c);
    c.onclick= function(){
    coin[p][i].h.innerHTML="";
    coinMove(i);
    }}}else{
  if(coin[p][i].s==1 && coin[p][i].w==0 && t<57){
    removeElem("coin"+p+i);
    cell[coin[p][i].c].appendChild(c);
    c.onclick= function(){
    cell[coin[p][i].c].innerHTML="";
    coinMove(i);   
    }}     
    }
    t = 0;
    } 
  }else{                    //5 s==0 || di!=6
      passOut();
  }
  }else{                    //win || no player
      passOut();
  }
    
}

function coinMove(x){
var c = coin[p][x];
var cc = c.c;
var ci = c.i;

// Move conditions //

  if(di==6){             //1 dice 6
   if(c.s==1){           //2 stutas 1
        c.c += di;
        c.i += di;
   if(c.c > 52){         //3 cell start check
   let ext = c.c - 52;
       c.c = ext;
   }
   if(c.i > 50){         //4 index in home cell
   let ext = c.i - 50;
   if(ext<=6){           //5 home cell < 7
   var e = ext.toString();
       c.c = p+60+e;
       if(ext==6)        //6 coin win check
           c.w=1;
       }else{
           c.i=ci;
           c.c=cc;
       }
   }
   cutCoin(x);
   cell[cc].innerHTML= "";
   cell[c.c].appendChild(c.n);
   refreshCoins();
        time=0;
        di=0;
     }else{              //7 stutus 0      
        c.s=1;
        time=0;
        di=0;
        c.h.innerHTML="";
        cell[cc].appendChild(c.n);
        refreshCoins();
     }
   }else{                 //8 dice not 6
     if(c.s==1){       
        c.c += di;
        c.i += di;
   if(c.c > 52){          //9 cell start check
   let ext = c.c - 52;
       c.c = ext;
   }
   if(c.i > 50){          //10 index in home cel
   let ext = c.i - 50;
   if(ext<=6){            //11 home cell < 7
   var e = ext.toString();
       c.c = p+60+e;
       if(ext==6)         //12 coin win check
           c.w=1;
       }else{
           c.i=ci;
           c.c=cc;
       }
   }
   cutCoin(x);
   cell[cc].innerHTML= "";       
   cell[c.c].appendChild(c.n); 
   passOut();
     }else{              //13 stutus 0 && di !6
        passOut();
     }
   }
}   

function cutCoin(x){   
for(let a=1,c=2;a<=4;a++){
for(let i=1;i<=4;i++){
 if(p!=a && coin[p][x].c==coin[a][i].c){//same c
 if(coin[p][x].c!=2 && coin[p][x].c!=15 && coin[p][x].c!=28 && coin[p][x].c!=41){   //stamp
  return coin[a][i].h.appendChild(coin[a][i].n),
         coin[a][i].c=c,
         coin[a][i].i=0,
         coin[a][i].s=0;  
       }
     }
   } c+=13;  
 }
}

function refreshCoins(){
  for(let i=1; i<=52; i++) {  //clear all cell
    cell[i].innerHTML = "";
    }  
  for(let i=61;i<=64;i++){    //clear all h cell
    for(let j=1;j<=6;j++){
    var t=i.toString();
     cell[t+j].innerHTML = "";
      }
    }
  for(var i=1; i<=4; i++) {   //reset coins
  var w = 0;
   for(var j=1; j<=4; j++) {
    w = coin[i][j].w + w;
    coin[i][j].h.innerHTML = "";
    if(coin[i][j].s==1){
    cell[coin[i][j].c].appendChild(cn[i][j]);
    }else{
    coin[i][j].h.appendChild(cn[i][j]);
    }
    if(w==4){                  //player win
       win[i]=1;
       console.log("Player"+i+" Win!")
    }
   }
  }
  for(var i=1; i<=4; i++){   //reset cur plr cel
    if(coin[p][i].s==1){
    cell[coin[p][i].c].appendChild(cn[p][i]);
    }
  }
}

function passOut() {       //passout to next plr
setTimeout(function(){
var dice = document.getElementById("dice");

switch (p)  {             //pass dice
     case 1:
     if(win[2]==0){
       p = 2 ;     
            dice.style.top = "10px";
            dice.style.left = "290px";
       refreshCoins();
     break ;
     }
     case 2:
     if(win[3]==0){
       p = 3 ;        
            dice.style.top = "520px";
            dice.style.left = "290px";
        refreshCoins();
     break ;
     }
     case 3:
     if(win[4]==0){
       p = 4 ;           
            dice.style.top = "520px";
            dice.style.left = "10px";
        refreshCoins();
     break ;
     }
     case 4:
     if(win[1]==0){
       p = 1 ;      
            dice.style.top = "10px";
            dice.style.left = "10px";
         refreshCoins();  
     }else if(win[2]==0){
       p = 2 ; 
            dice.style.top = "10px";
            dice.style.left = "290px";
       refreshCoins();
     }else if(win[3]==0){
       p = 3 ;        
            dice.style.top = "520px";
            dice.style.left = "290px";
        refreshCoins();
      }  
     break ;
    }
    w=0
    di=0;
    time=0;
  },500);
}  

function selectPlr(plr){  //select number of plr
if(plr==3){
for(let i=1;i<=4;i++){
    win[4]=1;
   }
}else if(plr==2){
for(let i=1;i<=4;i++){
    win[2]=1;
    win[4]=1;
   };
  }
isActive=true;
document.getElementById("dr").innerHTML="";
}
