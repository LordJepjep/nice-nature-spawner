console.log("start");
const mainDiv = document.getElementById("main");
mainDiv.addEventListener("click", handleClick);

let mainDivRect = mainDiv.getBoundingClientRect();
let canvasWidth = mainDivRect.width;
let canvasHeight = mainDivRect.height;
let thickness = 10;

// natie options
let size = 50;

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

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
  },
});

// creates the wallks

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
  const natie = Bodies.circle(x, y, size);
  Composite.add(engine.world, [natie]);
}
