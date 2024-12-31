// ------------------------------ Loader ------------------------------//
const loader = document.querySelector(".loader-wrapper");
window.addEventListener("load", () => {
    loader.classList.add("hidden");
    
    loader.addEventListener("transitionend", () => {
        loader.remove();
    });
});
// ------------------------------ Nav bar ------------------------------    
const bars = document.getElementById("bars");
const nitems =document.getElementById("nitems");
const main = document.getElementById("main");   
bars.addEventListener("click", () => {
    bars.classList.toggle("active");
    nitems.classList.toggle("come");
    if(window.innerWidth < 800) {
        main.classList.toggle("blur");
    }else if(window.innerWidth > 800) {
        main.classList.toggle("blur");
    }
});

// ------------------------------ Three ------------------------------


import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(-45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const ambientlight = new THREE.AmbientLight(0xffffff);


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(100);

renderer.render(scene, camera);


document.body.addEventListener("resize",()=>{
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(100);

    renderer.render(scene, camera);
});



scene.add(ambientlight);




function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x2233ff, wireframe:true });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

earth.position.set(-5, 0, 90);
scene.add(earth);
earth.rotation.z = Math.PI / 5;

Array(200).fill().forEach(addStar);


function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.0055;

    renderer.render(scene, camera);
}
animate();