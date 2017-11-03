class Model
{
  constructor(meshes, name="model")
  {
    this.name = name;
    this.meshes = meshes;
    this.amountOfMeshes = meshes.length;
    this.object = new THREE.Object3D();

    for(let i = 0; i < this.amountOfMeshes; i++)
      this.object.add(this.meshes[i].mesh);
  }

  changeMaterial()
  {
    var texturetype = "";
    for(let i = 0; i < this.amountOfMeshes; i++)
      texturetype = this.meshes[i].changeMaterial();

    return texturetype;
  }
};
