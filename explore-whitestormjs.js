const cameraO = new WHS.OrthographicCamera({
  camera: {
    far: 10000
  },

  position: {
    x: 10,
      y: 1000,
      z: 0
  }
});

const cameraP = new WHS.PerspectiveCamera({
  camera: {
    fov: 100,
    aspect: window.innerWidth / window.innerHeight
  },

  // position: {
  //   x: 10,
  //   y: 1000,
  //   z: 0
  // }
});

const app = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  //cameraP,
  new WHS.app.CameraModule({
   cameraO,
    position: {
    x: 10,
    y: 1000,
    z: 0
  }
  }),
  new WHS.app.RenderingModule({
    bgColor: 0x162129,

    renderer: {
      antialias: true,
      shadowmap: {
        type: THREE.PCFSoftShadowMap
      }
    }
  }, {shadow: true}),
  new PHYSICS.WorldModule({
    ammo: 'https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/75634e80/vendor/ammo.js'
  }),
  new WHS.controls.OrbitModule()
]);

// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );

// const camera = new WHS.OrthographicCamera({
//   camera: {
//     far: 10000
//   },

//   position: {
//     x: 10,
//       y: 1000,
//       z: 0
//   }
//});

//cameraP.addTo(app);
// // Sphere
// const sphere = new WHS.Sphere({ // Create sphere comonent.
//   geometry: {
//     radius: 5,
//     widthSegments: 32,
//     heightSegments: 32
//   },
  
//   modules: [
//     new PHYSICS.SphereModule({
//       mass: 10
//     })
//   ],

//   material: new THREE.MeshPhongMaterial({
//     color: 0xF2F2F2
//   }), 

//   position: new THREE.Vector3(0, 15, 0)
// });

//sphere.addTo(app);

// Plane
new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },
  
  modules: [
    new PHYSICS.PlaneModule({
      mass: 0,
      friction: 1
    })
  ],

  material: new THREE.MeshPhongMaterial({color: 0x447F8B}),

  rotation: {
    x: -Math.PI / 2
  }
}).addTo(app);

const box = new WHS.Box({
  geometry: {
    width: 20,
    height: 20,
    depth: 20
  },
  
  modules: [
    new PHYSICS.BoxModule({
      mass: 20
      //friction: 0
    })
  ],
  
  material: new THREE.MeshBasicMaterial({color: 0xff0000})
});

// Conveyor
const conveyor = new WHS.Box({
  geometry: {
    width: 100,
    height: 2,
    depth: 5000
  },
  
  modules: [
    new PHYSICS.BoxModule({
      mass: 1000,
      friction: 0
    })
  ],
  
  material: new THREE.MeshBasicMaterial({color: 0xaaaaaa})
});
conveyor.on('collision', (otherObject, v, r, contactNormal) => {
  //window.alert("Contact");
  otherObject.component.setLinearVelocity(new THREE.Vector3(0, 0, 160));//new Vector3(2000,0,0));//{x: 20000, y:0, z: 0});
});


const box2 = box.clone();
box2.position.y += 50;
box2.addTo(app);
conveyor.addTo(app); 
box.addTo(app);
//app.camera.component.lookAt(box.position)
// Lights
new WHS.PointLight({
  light: {
    intensity: 0.5,
    distance: 100
  },

  shadow: {
    fov: 90
  },

  position: new THREE.Vector3(0, 10, 10)
}).addTo(app);

new WHS.AmbientLight({
  light: {
    intensity: 0.4
  }
}).addTo(app);

app.start();
