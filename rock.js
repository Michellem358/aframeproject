class Coin{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = y;
	this.visible=true;

    this.obj = document.createElement("a-torus");
	this.obj.setAttribute("interact","");
    this.obj.setAttribute("color","yellow");
    this.obj.setAttribute("radius",0.5);
	this.obj.setAttribute("scale",{x:0.3, y:0.3, z:0.3});
	this.obj.setAttribute("radius-tubular",0.1);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
	
	this.obj.addEventListener("click", () => {
		this.collect();
	});
	
    scene.append(this.obj);

  }
  
  collect(){
    coin_collected++;
	this.visible=false;
    this.obj.setAttribute("opacity",0)
  }
  
}