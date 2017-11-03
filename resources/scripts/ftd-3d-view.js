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

    function init()
    {
      document.body.style.overflow = "hidden";
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.style.background = "#333333ff";

      container = document.getElementsByTagName('ftd-viewer')[0];

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 10;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      var pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      ambient = new THREE.AmbientLight(0xffffff, 0.5);
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

      loadModel();
      createControls();
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

    function createControls()
    {
      const text = document.createElement('div');
      text.style.position = "absolute";
      text.style.top = "40px";
      text.style.left = "50%";
      text.style.color = "white";
      container.appendChild(text);

      const viewButton = document.createElement('div');
      viewButton.setAttribute('class', "viewer-button");
      viewButton.innerHTML = "texture";
      viewButton.addEventListener('click', ()=>
      {
        text.innerHTML = model.changeMaterial();
      });
      container.appendChild(viewButton);
    }

    function render()
    {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }

    init();
});
