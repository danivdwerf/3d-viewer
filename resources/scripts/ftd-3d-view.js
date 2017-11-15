window.addEventListener('load', ()=>
{
  if (!Detector.webgl)
  {
    Detector.addGetWebGLMessage();
    return;
  }

  var container = null;
  var camera = null;
  var controls = null;
  var scene = null;
  var renderer = null;
  var lighting = null;
  var ambient = null;
  var keyLight = null;
  var fillLight = null;
  var backLight = null;
  var model = null;
  var ui = null;
  var mainLight = null, fillLight = null, backLight = null;
  var center = null;
  const loader = document.createElement('div');

  function setupBody()
  {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#333333ff";
  }

  function setupDocument()
  {
    ui = new UI(container);
    ui.originalButton.addEventListener('click', ()=>{model.showOriginal();});
    ui.albedoButton.addEventListener('click', ()=>{model.showAlbedo();});
    ui.normalButton.addEventListener('click', ()=>{model.showNormal();});
    ui.specularButton.addEventListener('click', ()=>{model.showSpecular();});
    ui.aoButton.addEventListener('click', ()=>{model.showAO();});
    ui.wireframeButton.addEventListener('click', ()=>{model.showWireframe();});

    ui.lightButton.addEventListener('click', ()=>
    {
      const mainIntensity = mainLight.intensity;
      const ambientIntensity = ambient.intensity;

      mainLight.setIntensity(ambientIntensity);
      fillLight.setIntensity(ambientIntensity);
      backLight.setIntensity(ambientIntensity);

      ambient.intensity = mainIntensity;
    });
  }

  function init()
  {
    loader.setAttribute('class', "ftd-loader ftd-spin");
    document.body.appendChild(loader);

    container = document.getElementsByTagName('ftd-viewer')[0];
    container.addEventListener('dblclick', (e)=>
    {
      e.preventDefault();
      controls.reset();
      camera.position.set(center.x, center.y, center.z+50);
      controls.target.set(center.x, center.y, center.z);
    });
    setupBody();
    setupDocument();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 50;

    mainLight = new DirectionalLight(0xffffff, 1.0);
    mainLight.setPosition(-100, 0, 100);

    fillLight = new DirectionalLight(0xffffff, 1.0);
    fillLight.setPosition(100, 0, 100);

    backLight = new DirectionalLight(0xffffff, 1.0);
    backLight.setPosition(100, 0, -100);

    scene.add(mainLight.mesh);
    scene.add(fillLight.mesh);
    scene.add(backLight.mesh);

    ambient = new THREE.AmbientLight(0xffffff, 0);
    scene.add(ambient);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color("#333333"));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    window.addEventListener('resize', ()=>
    {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }, false);

    loadModel();
    render();
  }

  function loadModel()
  {
    const fbxPath = container.getAttribute('fbx');
    if(fbxPath == null)
    {
      console.error('Could not find FBX file, please use the `fbx` attribute in your ftd-viewer!');
      return;
    }

    const fbxLoader = new THREE.FBXLoader();
    fbxLoader.load(fbxPath, (object)=>
    {
      const meshes = [];
      object.traverse((child)=>
      {
        if(child instanceof THREE.Mesh)
          meshes.push(new Mesh(child));
      });

      model = new Model(meshes);
      scene.add(model.object);

      const bbox = new THREE.Box3().setFromObject(model.object);
      center = bbox.getCenter();
      if(bbox.max.y >= 40)
      {
        const scale = 40/bbox.max.y;
        center.x *= scale;
        center.y *= scale;
        center.z *= scale;
        model.object.scale.set(scale, scale, scale);
      }

      camera.position.set(center.x, center.y, center.z+50);
      controls.target.set(center.x, center.y, center.z);
      document.body.removeChild(loader);
    }, (progress)=>{},
    (error)=>
    {
      console.error(error);
    });
  }

  window.addEventListener('keydown', (e)=>
  {
      if(e.keyCode == 32)
      {
        model.showWireframe();
      }
  });

  function render()
  {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
  }
  init();
});
