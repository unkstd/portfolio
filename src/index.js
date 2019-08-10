import "reset-css";
import "./scss/style.scss";

const THREE = require("three");
const noise = require("perlin").noise;
import ScrollReveal from "scrollreveal";
import { TweenMax } from "gsap";

setTimeout(() => { // Sphere
  if (document.getElementById("heroGeometry")) {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("heroGeometry"),
      antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const sphere_geometry = new THREE.SphereGeometry(1, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      emissive: 0xffffff,
      wireframe: true
    });

    const sphere = new THREE.Mesh(sphere_geometry, material);

    sphere.castShadow = true;
    sphere.receiveShadow = false;

    scene.add(sphere);

    const update = () => {
      let time = performance.now() * 0.0003,
        k = 10;

      sphere.geometry.vertices.map(p => {
        p.normalize().multiplyScalar(
          1 + 0.2 * noise.perlin3(p.x + k + time, p.y * k, p.z * k)
        );
      })

      sphere.geometry.computeVertexNormals();
      sphere.geometry.normalsNeedUpdate = true;
      sphere.geometry.verticesNeedUpdate = true;
    };

    const animate = () => {
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.0005;

      update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    document.getElementById("heroGeometry").classList.remove("hidden");
  }
}, 700);

window.onload = () => {
  window.scrollTo(0, 0); // Reset scrolled
  /****
   * Preloader
   */

  document.getElementById("preloader").classList.add("opacity");
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 500);
  document.getElementById("app").classList.add("loaded");

  /****
   * Animations
   */

  ScrollReveal().reveal(
    ".sectionName",
    {
      duration: 1000,
      delay: 100,
      distance: "20px",
      easing: "cubic-bezier(0.19, 1, 0.22, 1)",
      origin: "bottom",
      reset: true,
      scale: 1,
      viewFactor: 0
    },
    150
  );

  ScrollReveal().reveal(
    ".project",
    {
      duration: 1000,
      delay: 300,
      distance: "20px",
      easing: "cubic-bezier(0.19, 1, 0.22, 1)",
      origin: "bottom",
      reset: true,
      scale: 1,
      viewFactor: 0
    },
    150
  );

  ScrollReveal().reveal(
    ".footer",
    {
      duration: 3000,
      easing: "cubic-bezier(0.19, 1, 0.22, 1)",
      reset: true
    },
    150
  );

  TweenMax.fromTo(
    document.getElementsByClassName("header_logo"),
    0.6,
    {
      css: {
        opacity: "0"
      }
    },
    {
      css: {
        opacity: "1"
      }
    }
  ).delay(3.5);

  document.querySelectorAll(".hero .title span").forEach((block, index) => {
    TweenMax.fromTo(
      block,
      1,
      {
        ease: Expo.easeOut,
        css: {
          transform: "translateY(20px)",
          opacity: "0"
        }
      },
      {
        ease: Expo.easeOut,
        css: {
          transform: "translateY(0)",
          opacity: "1"
        }
      }
    ).delay(0.05 * index + 10 / 10 + 1.5);
  });

  /****
   * Slide down function
   */

  document.getElementById("slideDown").addEventListener("click", () => {
    window.scrollTo(0, window.innerHeight);
  });

  /****
   * Scrollbar
   */

  window.addEventListener("scroll", () => {
    let getDocHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    };
    let ratio =
      window.scrollY /
      ((getDocHeight() -
        window.innerHeight +
        document.getElementById("footer").offsetHeight -
        20) /
        100);
    document.getElementById("progress").style = `height: ${ratio}%`;
  });
};
