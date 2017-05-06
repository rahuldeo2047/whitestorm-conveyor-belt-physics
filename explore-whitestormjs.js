// Try it on http://playground.whsjs.io

const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: {
    delay: 1
  },

  gravity: { // Physic gravity.
      x: 0,
      y: -100,
      z: 0
  },

  camera: {
    position: [100, 100, 100]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  container: document.body
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },

  position: {
    x: 0,
    y: 100,
    z: 0
  }
});

const plane = new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: - Math.PI / 2
  }
});

new WHS.PointLight({
  light: {
    intensity: 0.5
  },

  shadowmap: {
    fov: 90
  },

  position: {
    z: 10,
    y: 10
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(world);

const box = new WHS.Box({
  geometry: {
    width: 100,
    height: 2,
    depth: 300
  },
  
  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },

  position: {
    x: 0,
    y: 1,
    z: 0
  }
   
});

// https://github.com/WhitestormJS/physics-module-ammonext/blob/master/src/modules/WorldModule.js#L487
fnCollide = function(otherObject, v, r, contactNormal)
{
    // None work
 window.alert("Contact");
  //otherObject.setLinearVelocity(new Vector3(0,200,200));  
  //otherObject.setLinearVelocity({x: 2000, y:200, z: 200});//new Vector3(0,200,200));
 otherObject.applyCentralImpulse({x: 200, y:200, z: 200});
}

box.on('collision', fnCollide);

const box1 = new WHS.Box({
  geometry: {
    width: 20,
    height: 20,
    depth: 20
  },
  
  mass: 1, // Mass of physics object.

  material: {
    color: 0xF2aaaa,
    kind: 'lambert'
  },

  position: {
    x: 0,
    y: 50,
    z: 0
  }
   
});

box.addTo(world);
box1.addTo(world);

//box1.applyCentralImpulse(0); // unusual behaviour box1 disappears
//applyCentralImpulse
//sphere.addTo(world);
plane.addTo(world);

window.alert("Starting...");

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
