import Matter from 'matter-js';

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Events = Matter.Events;


const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 0.1;


const circle = Bodies.circle(windowWidth/2, 50, 10, {
        friction: 0.2,
        restitution: 0.8,
        render: {
          fillStyle: '#000',
          trokeStyle: '#000',
          lineWidth: 1
        }
      });
const ground = Bodies.rectangle(windowWidth/2, windowHeight-50, windowWidth/3, 10, {
        isStatic: true
      });

World.add(engine.world, [circle, ground]);

setInterval(() => {
  const box = Bodies.circle(windowWidth/2, 50, 10, {
    friction: 0.2,
    restitution: 0.8
  });
  World.add(engine.world, box);
}, 1000);


const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: windowWidth,
      height: windowHeight,
      wireframes: false,
      background: '#fff'
    }
});

render.canvas.addEventListener("click", (e) => {
  const box = Bodies.circle(e.offsetX, e.offsetY, 10, {
    friction: 0.2,
    restitution: 0.8
  });
  World.add(engine.world, box);
}, false);


Engine.run(engine);
Render.run(render);

Events.on(engine, "collisionStart", (event) => {
  console.log('collision');
});



