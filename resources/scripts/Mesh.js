class Mesh
{
  constructor(mesh, info)
  {
    this.mesh = mesh;
    this.name = mesh.name;
    this.info = info;

    this.albedoMap = null;
    this.normalMap = null;
    this.heightMap = null;
    this.aoMap = null;
    this.specularMap = null;

    this.setMaterial();
  }

  setMaterial()
  {
    this.mesh.material = new THREE.MeshPhongMaterial({color: 0xffffff});
    this.mesh.material.needsUpdate = true;
    this.loadTextures();
  }

  loadTextures()
  {
    const folder = this.info['folder'].value || null;
    if(folder == null)
    {
      console.error("Folder attribute not specified, textures won't be loaded");
      return;
    }

    var albedofile = null;
    var normalfile = null;
    var aofile = null;
    var heightfile = null;
    var specularfile = null;

    var temp = null
    if(!(temp = this.info['albedo-map']))
      albedofile = this.name+"_albedo.png";
    else
      albedofile = temp.value;

    if(!(temp = this.info['normal-map']))
      normalfile = this.name+"_normal.png";
    else
      normalfile = temp.value;

    if(!(temp = this.info['ao-map']))
      aofile = this.name+"_ao.png";
    else
      aofile = temp.value;

    if(!(temp = this.info['height-map']))
      heightfile = this.name+"_height.png";
    else
      heightfile = temp.value;

    if(!(temp = this.info['specular-map']))
      specularfile = this.name+"_specular.png";
    else
      specularfile = temp.value;

    const loader = new THREE.TextureLoader();

    loader.load(folder+albedofile, (texture)=>
    {
      this.mesh.material.map = texture;
      this.mesh.material.needsUpdate = true;
    });

    loader.load(folder+normalfile, (texture)=>
    {
      this.mesh.material.normalMap = texture;
      this.mesh.material.needsUpdate = true;
    });

    loader.load(folder+heightfile, (texture)=>
    {
      this.mesh.material.displacementMap = texture;
      this.mesh.material.needsUpdate = true;
    });

    loader.load(folder+aofile, (texture)=>
    {
      this.mesh.material.aoMap = texture;
      this.mesh.material.needsUpdate = true;
    });

    loader.load(folder+specularfile, (texture)=>
    {
      this.mesh.material.specularMap = texture;
      this.mesh.material.needsUpdate = true;
    });
  }
};
