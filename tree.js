class Tree{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = y;
	
	
    this.obj = document.createElement("a-cone");
	this.obj.setAttribute("static-body","");
    this.obj.setAttribute("color","green");
    this.obj.setAttribute("height",10);
	this.obj.setAttribute("radius",20);
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

  }
}