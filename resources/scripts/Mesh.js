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
  }

  setOriginalMaterial()
  {
    this.mesh.material = this.material;
    this.mesh.material.needsUpdate = true;
  }

  setTextures()
  {
    this.albedo = this.material.map || null;
    this.normal = this.material.normalMap || null;
    this.ao = this.material.aoMap || null;
    this.specular = this.material.specularMap || null;

    if(this.material.map != null)
    {
      this.textures.push(this.material.map);
      this.textureNames.push("Albedo");
    }

    if(this.material.normalMap != null)
    {
      this.textures.push(this.material.normalMap);
      this.textureNames.push("Normal");
    }

    if(this.material.aoMap != null)
    {
      this.textures.push(this.material.aoMap);
      this.textureNames.push("Ambient Occlusion");
    }

    if(this.material.specularMap != null)
    {
      this.textures.push(this.material.specularMap);
      this.textureNames.push("Specular");
    }
  }

  changeMaterial()
  {
    const tex = this.textures[this.index];
    const mat = new THREE.MeshPhongMaterial({color: 0xffffff, map: tex});
    this.mesh.material = mat;
    this.mesh.material.needsUpdate = true;
    this.index++;
    if(this.index > this.textures.length)
    {
      this.setOriginalMaterial();
      this.index = 0;
      return "Original";
    }

    return this.textureNames[this.index-1];
  }
};
