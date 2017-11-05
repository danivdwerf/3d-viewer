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
  }

  function init()
  {
    loader.setAttribute('class', "ftd-loader ftd-spin");
    document.body.appendChild(loader);

    container = document.getElementsByTagName('ftd-viewer')[0];
    setupBody();
    setupDocument();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 50;

    const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 200, 50);
    scene.add(pointLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 200, -50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(-50, 200, -50);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(-50, 200, 50);
    scene.add(pointLight3);

    ambient = new THREE.AmbientLight(0xffffff, 0.1);
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

  window.addEventListener('dblclick', (e)=>
  {
    e.preventDefault();
    controls.reset();
    camera.position.set(center.x, center.y, center.z+50);
    controls.target.set(center.x, center.y, center.z);
  });

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
    },
    (progress)=>
    {
      console.log(progress.loaded/progress.total*100);
    },
    (error)=>
    {
      console.log(error);
    });
  }

  function render()
  {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
  }
  init();
});
