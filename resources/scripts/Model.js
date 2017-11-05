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

  showOriginal()
  {
    for(let i = 0; i < this.amountOfMeshes; i++)
      this.meshes[i].setOriginalMaterial();
  }

  showNormal()
  {
    for(let i = 0; i < this.amountOfMeshes; i++)
      this.meshes[i].setNormalMat();
  }

  showAlbedo()
  {
    for(let i = 0; i < this.amountOfMeshes; i++)
      this.meshes[i].setAlbedoMat();
  }

  showSpecular()
  {
    for(let i = 0; i < this.amountOfMeshes; i++)
      this.meshes[i].setSpecularMat();
  }

  showAO()
  {
    for(let i = 0; i < this.amountOfMeshes; i++)
      this.meshes[i].setAOMat();
  }
};
