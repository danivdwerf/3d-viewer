class Mesh
{
  constructor(mesh)
  {
    this.mesh = mesh;
    this.name = mesh.name;
    this.material = mesh.material;
    this.index = 0;
    this.textureNames = [];
    this.textures = [];
    this.setTextures();
    this.setOriginalMaterial();
  }

  setOriginalMaterial()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.albedo, normalMap: this.normal, aoMap: this.ao, specularMap: this.specular});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
  }

  setNormalMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.normal, normalMap: this.normal});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
  }

  setAlbedoMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.albedo});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
  }

  setSpecularMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0x000000, map: this.specular, specularMap: this.specular});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
  }

  setAOMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0x000000, map: this.ao, aoMap: this.ao});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
  }

  setTextures()
  {
    this.albedo = this.material.map || null;
    this.normal = this.material.normalMap || null;
    this.ao = this.material.aoMap || null;
    this.specular = this.material.specularMap || null;
  }
};
