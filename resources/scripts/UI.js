class UI
{
  constructor(container)
  {
    this.container = container
    this.createTextureSwitch();
    this.createLightSwitch();
  }

  createLightSwitch()
  {
    this.lightButton = document.createElement('div');
    this.lightButton.innerHTML = '<i class="fa fa-lightbulb-o"></i>';
    this.lightButton.setAttribute('id', "light-nav-button");
    this.container.appendChild(this.lightButton);
  }

  createTextureSwitch()
  {
    const textureNavLabel = document.createElement('label');
    textureNavLabel.innerHTML = '<i class="fa fa-bars"></i>';
    textureNavLabel.setAttribute('for', "texture-nav-check");
    textureNavLabel.setAttribute('class', "texture-nav-label");

    const textureNavSwitch = document.createElement('input');
    textureNavSwitch.setAttribute("class", "hide");
    textureNavSwitch.setAttribute("type", "checkbox");
    textureNavSwitch.setAttribute("id", "texture-nav-check");
    textureNavSwitch.setAttribute("checked", "true");

    this.container.appendChild(textureNavLabel);
    this.container.appendChild(textureNavSwitch);

    const textureNav = document.createElement('div');
    textureNav.setAttribute('class', "texture-navigation");
    this.container.appendChild(textureNav);

    this.originalButton = document.createElement('div');
    this.originalButton.setAttribute('class','texture-nav-button');
    this.originalButton.innerHTML = "Original";
    textureNav.appendChild(this.originalButton);

    this.albedoButton = document.createElement('div');
    this.albedoButton.setAttribute('class','texture-nav-button');
    this.albedoButton.innerHTML = "Albedo";
    textureNav.appendChild(this.albedoButton);

    this.normalButton = document.createElement('div');
    this.normalButton.setAttribute('class','texture-nav-button');
    this.normalButton.innerHTML = "Normal";
    textureNav.appendChild(this.normalButton);

    this.specularButton = document.createElement('div');
    this.specularButton.setAttribute('class','texture-nav-button');
    this.specularButton.innerHTML = "Specular";
    textureNav.appendChild(this.specularButton);

    this.aoButton = document.createElement('div');
    this.aoButton.setAttribute('class','texture-nav-button');
    this.aoButton.innerHTML = "Ambient Occlusion";
    textureNav.appendChild(this.aoButton);
  }
};
