function callMe() {
  $("#tsparticles")
    .particles()
    .init({
      fullScreen: false,
      // background: {
      //   color: "#fff",
      // },
      particles: {
        angle: {
          value: 0,
          offset: 30,
        },
        move: {
          enable: true,
          outModes: {
            top: "none",
            default: "destroy",
          },
          gravity: {
            enable: true,
          },
          speed: { min: 5, max: 30 },
          decay: 0.01,
        },
        number: {
          value: 0,
          limit: 300,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: ["circle", "square", "triangle"],
        },
        size: {
          value: { min: 7, max: 10 },
          animation: {
            count: 1,
            startValue: "min",
            enable: true,
            speed: 5,
            sync: true,
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: "random",
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
      emitters: [
        baseEmitterConfig("top-right", { x: 0, y: 10 }),
        baseEmitterConfig("top-left", { x: 100, y: 10 }),
      ],
    });
}

const baseEmitterConfig = (direction, position) => {
  return {
    direction,
    rate: {
      quantity: 15,
      delay: 0.3,
    },
    size: {
      width: 0,
      height: 0,
    },
    spawnColor: {
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          offset: {
            min: -1.4,
            max: 1.4,
          },
          speed: 2,
          sync: false,
        },
        l: {
          enable: true,
          offset: {
            min: 40,
            max: 60,
          },
          speed: 0,
          sync: false,
        },
      },
    },
    position,
  };
};

// $(document).ready(async function () {
//     callMe();
// });
