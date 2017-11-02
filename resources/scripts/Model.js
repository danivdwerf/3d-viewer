class Model
{
  constructor(meshes, name="model")
  {
    this.name = name;
    this.meshes = meshes;
    this.object = new THREE.Object3D();

    for(let i = 0; i < this.meshes.length; i++)
      this.object.add(this.meshes[i].mesh);
  }
};
