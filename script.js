let maze = [
  "bb-o---bbbbbbbbbbbbbbbbbb",
  "b-T----------------d----b",
  "b-T---------------------b",
  "b-T---------------TTTTTTb",
  "b-TTTTTTTTTTTTT---------b",
  "b-----------------------b",
  "b-TTTTTTT---------------b",
  "b-T---------TTTTT-------b",
  "b-----------------------b",
  "b-TTT----TTTTT-------TTTb",
  "b-T-------TTT-----o--TTTb",
  "b-TTTTTT---TTTTT-----TTTb",
  "b-TT------------TT---TTTb",
  "b-TTTTTT-------TT----TTTb",
  "b-----------------------b",
  "b-TTTTTTTTT------TTTTTTTb",
  "b-----------------------b",
  "b-TTTTTTTTTTTTTT--------b",
  "b-------d---------------b",
  "b-TTTTTTTTTTTTTT--------b",
  "b-T----TTT--------------b",
  "b-T--o---TTTTT----------b",
  "b-T---------------TTTTTTb",
  "b-TTTTTTTTTTTTT---------b",
  "b----------d------------b",
  "b-TTTTTTT---------------b",
  "b-T---------TTTTT-------b",
  "b-TTT----TTTTT-------TTTb",
  "b-T---o---TTT--------TTTb",
  "b-----------------------b",
  "b-TTTTTT---TTTTT-----TTTb",
  "b-TT--------------TTTTTTb",
  "b-----d------------o-TTTb",
  "b-TTTTTT-------TT----TTTb",
  "b-TTTTTTTTT------TTTTTTTb",
  "b-TTTTTTTTTTT-----------b",
  "b-TTTTTTTTTTTTTT--------b",
  "bbbbbbbbbbbbbbbbbbb-----b",

];
let scene,player,zombiedogs = [];
let coins = [];
let coin_collected=0;
let cointext;
let lives = [];
let livecount=3;
let livetext;
window.onload = function(){
  scene = document.querySelector("a-scene");
  cointext=document.querySelector("#Coins");
  livetext=document.querySelector("#Lives");
  player = new Player("a-camera");
  for(let x = 0; x < maze.length; x++){
    let row = maze[x];
    let cols = row.split("");
    for(let z = 0; z < cols.length; z++){
      if(cols[z] == "x"){
        new Block(x,1,z)
      }else if(cols[z] == "T"){
        new Tree(z,1,x);
      }else if(cols[z]=="o"){
		coins.push(new Coin(z,1,x))
	  }else if(cols[z]=="d"){
        zombiedogs.push(new Zombiedog(z,0.3,x))
      }else if(cols[z]=="b"){
        new Block(z,1,x)
	  }
    }
    
  }
  setTimeout(loop,1000);
}
function loop(){
	player.update();
	cointext.setAttribute("value","Coins:" + coin_collected);
	livetext.setAttribute("value","Lives:" + livecount);
	
	for(let Zombiedog of zombiedogs){
		let d = distance(Zombiedog.obj, player.obj);
		if(1 < d && d < 6){
		  Zombiedog.rotateTowards(player.obj);
		  Zombiedog.forward()
		}else{
		  Zombiedog.stop();
		}
		if(distance(Zombiedog.obj, player.obj)<1.7){
			console.log(player.driver.object3D.position.x)
			console.log(player.driver.object3D.position.y)
			console.log(player.driver.object3D.position.z)
			
			console.log("reset");
			player.driver.object3D.position.x=0;
			player.driver.object3D.position.y=1;
			player.driver.object3D.position.z=0;
			console.log(player.driver.object3D.position.x)
			console.log(player.driver.object3D.position.y)
			console.log(player.driver.object3D.position.z)
			livecount--;
			player.driver.components["dynamic-body"].syncToPhysics();
		}
	}
	
	for(let coin of coins){
		let d = distance(coin.obj, player.obj);
		if(d < 1 && coin.visible){
			console.log (coin_collected);
			coin.collect();
		}
		
	}
	
	

	
	
	
		
	window.requestAnimationFrame(loop);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}
 