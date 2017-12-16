class UI
{
  constructor(container)
  {
    this.container = container
    this.navigation = null;
    this.isFull = false;

    this.iframe = window.frameElement || document.getElementsByTagName('ftd-viewer')[0];

    this.createNavigation();
    this.createFullscreenSwitch();
    this.createLightSwitch();
    this.createTextureSwitch();
  }

  createNavigation()
  {
    const navLabel = document.createElement('label');
    navLabel.innerHTML = '<i class="fa fa-bars"></i>';
    navLabel.setAttribute('for', "nav-checkbox");
    navLabel.setAttribute('id', "nav-label");
    navLabel.setAttribute('class', "nav-button");

    const navSwitch = document.createElement('input');
    navSwitch.setAttribute("class", "hide");
    navSwitch.setAttribute("type", "checkbox");
    navSwitch.setAttribute("id", "nav-checkbox");
    navSwitch.setAttribute("checked", "true");

    this.container.appendChild(navLabel);
    this.container.appendChild(navSwitch);

    this.navigation = document.createElement('div');
    this.navigation.setAttribute('id', "navigation");
    this.container.appendChild(this.navigation);
  }

  createFullscreenSwitch()
  {
    const fullscreen = document.createElement('div');
    fullscreen.innerHTML = '<i class="fa fa-arrows-alt"></i>';
    fullscreen.setAttribute('id', "fullscreen-nav-button");
    fullscreen.setAttribute('class', "nav-button");
    this.navigation.appendChild(fullscreen);
    fullscreen.addEventListener('click', ()=>
    {
      if(!this.isFull)
      {
        const frameStyle = window.getComputedStyle(this.iframe);
        this.ogWidth = frameStyle.getPropertyValue("width") || "auto";
        this.ogHeight = frameStyle.getPropertyValue("height") || "auto";
        this.ogPos = frameStyle.getPropertyValue("position") || "relative";
        this.ogTop = frameStyle.getPropertyValue("top") || "0";
        this.ogLeft = frameStyle.getPropertyValue("left") || "0";
        this.ogzindex = frameStyle.getPropertyValue('z-index') || "1";

        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";
        this.iframe.style.position = "fixed";
        this.iframe.style.top = "0";
        this.iframe.style.left = "0";
        this.iframe.style.zIndex = "9999";
        fullscreen.innerHTML = '<i class="fa fa-compress" aria-hidden="true"></i>';
        this.isFull = !this.isFull;
      }
      else
      {
        this.iframe.style = null;
        fullscreen.innerHTML = '<i class="fa fa-arrows-alt"></i>';
        this.isFull = !this.isFull;
      }
    });
  }

  createLightSwitch()
  {
    this.lightButton = document.createElement('div');
    this.lightButton.innerHTML = '<i class="fa fa-lightbulb-o"></i>';
    this.lightButton.setAttribute('id', "light-nav-button");
    this.lightButton.setAttribute('class', "nav-button");
    this.navigation.appendChild(this.lightButton);
  }

  createTextureSwitch()
  {
    const scrollingWindow = document.createElement('div');
    scrollingWindow.setAttribute('id', "scrolling-window");

    const buttons = document.createElement('div');
    buttons.setAttribute('id', "texture-buttons");

    this.originalButton = document.createElement('div');
    this.originalButton.setAttribute('class','texture-nav-button');
    this.originalButton.innerHTML = "Original";
    buttons.appendChild(this.originalButton);

    this.albedoButton = document.createElement('div');
    this.albedoButton.setAttribute('class','texture-nav-button');
    this.albedoButton.innerHTML = "Albedo";
    buttons.appendChild(this.albedoButton);

    this.normalButton = document.createElement('div');
    this.normalButton.setAttribute('class','texture-nav-button');
    this.normalButton.innerHTML = "Normal";
    buttons.appendChild(this.normalButton);

    this.specularButton = document.createElement('div');
    this.specularButton.setAttribute('class','texture-nav-button');
    this.specularButton.innerHTML = "Specular";
    buttons.appendChild(this.specularButton);

    this.aoButton = document.createElement('div');
    this.aoButton.setAttribute('class','texture-nav-button');
    this.aoButton.innerHTML = "Ambient Occlusion";
    buttons.appendChild(this.aoButton);

    this.wireframeButton = document.createElement('div');
    this.wireframeButton.setAttribute('class', "texture-nav-button");
    this.wireframeButton.innerHTML = "Wireframe";
    buttons.appendChild(this.wireframeButton);

    scrollingWindow.appendChild(buttons);
    this.navigation.appendChild(scrollingWindow);
  }
};
