class DirectionalLight
{
  constructor(colour, intensity)
  {
    this.colour = colour;
    this.intensity = intensity;
    this.mesh = new THREE.DirectionalLight(this.colour, this.intensity);
  }

  setPosition(x, y, z)
  {
    this.mesh.position.set(x, y, z);
  }

  setIntensity(value)
  {
    this.mesh.intensity = value;
    this.intensity = value;
  }
};
