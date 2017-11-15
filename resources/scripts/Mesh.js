class Mesh
{
  constructor(mesh)
  {
    this.mesh = mesh;
    this.wireframe = null;
    this.name = mesh.name;
    this.material = mesh.material;
    this.index = 0;
    this.textureNames = [];
    this.textures = [];
    this.setTextures();
    this.setOriginalMaterial();
    this.loadWireframe();
  }

  loadWireframe()
  {
    const geo = new THREE.EdgesGeometry(this.mesh.geometry);
    const wiremat = new THREE.LineBasicMaterial({color: 0x00000, linewidth: 1});
    this.wireframe = new THREE.LineSegments(geo, wiremat);
  }

  setWireframe()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0x75787c, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;

    this.mesh.add(this.wireframe);
  }

  setOriginalMaterial()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.albedo, normalMap: this.normal, aoMap: this.ao, specularMap: this.specular});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.mesh.remove(this.wireframe);
  }

  setNormalMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.normal, normalMap: this.normal});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.mesh.remove(this.wireframe);
  }

  setAlbedoMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: this.albedo});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.mesh.remove(this.wireframe);
  }

  setSpecularMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0x000000, map: this.specular, specularMap: this.specular});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.mesh.remove(this.wireframe);
  }

  setAOMat()
  {
    const mat = new THREE.MeshPhongMaterial({color: 0x000000, map: this.ao, aoMap: this.ao});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.mesh.remove(this.wireframe);
  }

  setTextures()
  {
    this.albedo = this.material.map || null;
    this.normal = this.material.normalMap || null;
    this.ao = this.material.aoMap || null;
    this.specular = this.material.specularMap || null;
  }
};
