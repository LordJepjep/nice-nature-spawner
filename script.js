console.log("start");
const mainDiv = document.getElementById("main");
mainDiv.addEventListener("click", handleClick);

let mainDivRect = mainDiv.getBoundingClientRect();
let canvasWidth = mainDivRect.width;
let canvasHeight = mainDivRect.height;
let thickness = 10;

// const matterContainer = document.querySelector("#matter-container")

// natie options
let size = 50;

// const natieOptions = {
//     render: {
//         sprite: {
//             texture:
//         }
//     }
// }

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Svg = Matter.Svg,
  Vector = Matter.Vector,
  Vertices = Matter.Vertices;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: mainDiv,
  engine: engine,
  options: {
    pixelRatio: 1,
    background: "transparent",
    width: mainDivRect.width,
    height: mainDivRect.height,
    wireframes: false,
  },
});

// creates the walls

const wallOptions = {
  isStatic: true,
  render: { visible: false },
};

let topWall = Bodies.rectangle(
  canvasWidth / 2,
  -thickness / 2,
  canvasWidth,
  thickness,
  wallOptions
);

let bottomWall = Bodies.rectangle(
  canvasWidth / 2,
  canvasHeight + thickness / 2,
  canvasWidth,
  thickness,
  wallOptions
);

let leftWall = Bodies.rectangle(
  -thickness / 2,
  canvasHeight / 2,
  thickness,
  canvasHeight,
  wallOptions
);

let rightWall = Bodies.rectangle(
  canvasWidth + thickness / 2,
  canvasHeight / 2,
  thickness,
  canvasHeight,
  wallOptions
);

// add all of the bodies to the world
Matter.Composite.add(engine.world, [topWall, bottomWall, leftWall, rightWall]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  console.log(`X: ${x}\nY: ${y}`);
  spawnNatie(x, y);
}

function spawnNatie(x, y) {
  const natie = Bodies.circle(x, y, size, {
    render: {
      sprite: {
        texture: "./assets/png/natie_normal.png",
        xScale: 100 / 300,
        yScale: 100 / 355,
      },
    },
  });
  Composite.add(engine.world, natie);
}
