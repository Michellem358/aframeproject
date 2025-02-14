class Zombiedog{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = y;

    this.obj = document.createElement("a-gltf-model");
    this.obj.setAttribute("src","#zombiedog");
	this.obj.setAttribute("scale",{x:1, y:1, z:1});
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

	
  } 
   angleTo(that){
      let dx = that.object3D.position.x - this.obj.object3D.position.x;
      let dz = that.object3D.position.z - this.obj.object3D.position.z;

      this.angle = Math.atan(dx/dz)
      if(dz < 0){
          this.angle += Math.PI
      }
  }
  rotateTowards(that){
      this.angleTo(that);
      this.obj.object3D.rotation.y = this.angle;
  }
  forward(){
      let dx = 0.02 * Math.sin(this.angle);
      let dz = 0.02 * Math.cos(this.angle);
      this.obj.object3D.position.x += dx;
      this.obj.object3D.position.z += dz; 
      this.obj.setAttribute("animation-mixer",{clip:"wolf_rig|running", timeScale:1.0});
  }
   stop(){
    this.obj.setAttribute("animation-mixer",{timeScale:0});
  }
  
}