import {DirectionalLight, MeshPhongMaterial, sRGBEncoding, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {Ground} from "./Ground";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

//import FBXLoader from "three-fbx-loader";
export class App {
  constructor(canvas) {
    this.canvas = canvas
    this.loader = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.renderer = null
    this.ground = null

    this.dirLight = null

    console.log("New App created")
  }

  // Initialization
  init() {
    console.log("App init")
    this.scene = new Scene()
    this.loader = new GLTFLoader()
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    })
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true

    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))

    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor( 0x000000, 1 );

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(90, aspect, 0.01, 1000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.set(-300, 200, 100)
    this.camera.lookAt(0, 0, 0)

    this.ground = new Ground()
    this.scene.add(this.ground.mesh)

    this.loader.load(
      'models/gltf/Configurateur_VoitureExterieur_04.gltf',
      // called when the resource is loaded
      (gltf) => {
        console.log(gltf)

        this.scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        gltf.scene.traverse( child => {
          if ( child.material ) child.material = new MeshPhongMaterial({color: child.material.color, shininess: 0});
      } );
      },
      // called while loading is progressing
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      (error) => {
        console.log('An error happened');
      }
    );

    this.loader.load(
      'models/gltf/Caroussel_PlanteAloe_0.gltf',
      // called when the resource is loaded
      (gltf) => {
        console.log(gltf)

        this.scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

        gltf.scene.position.x = 200;
        gltf.scene.position.y = 150;
      },
      // called while loading is progressing
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      (error) => {
        console.log('An error happened');
      }
    );

    this.dirLight = new DirectionalLight (0x9e00b0, 1)
    this.dirLight.position.set(-500, 300, 200)
    this.scene.add(this.dirLight)
    /*this.helper = new DirectionalLightHelper( this.dirLight, 5, 0xff0000 );
    this.scene.add( this.helper );*/

    this.dirLight2 = new DirectionalLight (0x0043b0, 1)
    this.dirLight2.position.set(500, 300, -200)
    this.scene.add(this.dirLight2)
    /*this.helper2 = new DirectionalLightHelper( this.dirLight2, 5, 0xff0000 );
    this.scene.add( this.helper2 );*/

    this.shadowLight = new DirectionalLight(0xd0d0d0, 1)
    this.shadowLight.position.set(-500, 300, 0)
    this.scene.add(this.shadowLight)

    this.shadowLight.castShadow = true
    this.shadowLight.shadow.mapSize.width = 2048
    this.shadowLight.shadow.mapSize.height = 2048

    const d = 50
    this.shadowLight.shadow.camera.left = -d
    this.shadowLight.shadow.camera.right = d
    this.shadowLight.shadow.camera.top = d
    this.shadowLight.shadow.camera.bottom = -d
    this.shadowLight.shadow.camera.near = 1
    this.shadowLight.shadow.camera.far = 50
    this.shadowLight.shadow.bias = 0.001
  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const needResize = this.canvas.width !== width || this.canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    //console.log(this.renderer.info)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))

    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }

    // Render ...
    this.render()
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")

    this.animate()
  }

  // Memory management
  destroy() {
    this.scene = null
    this.loader = null
    this.camera = null
    this.renderer = null

    this.controls.dispose()
    this.controls = null

    this.ground.destroy()
    this.ground = null

    this.dirLight.dispose()

    this.canvas = null
  }
}
