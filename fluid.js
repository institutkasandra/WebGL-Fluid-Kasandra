document.addEventListener("DOMContentLoaded", function () {
    console.log("WebGL Advanced Effect Initialized...");

    let canvas = document.getElementById("fluid-canvas");
    if (!canvas) {
        console.error("Canvas non trouvé, création...");
        canvas = document.createElement("canvas");
        canvas.id = "fluid-canvas";
        document.body.appendChild(canvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
    const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 1.0 } },
        vertexShader: `void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `void main() { gl_FragColor = vec4(0.1, 0.3, 0.6, 1.0); }`
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 2;

    function animate() {
        requestAnimationFrame(animate);
        material.uniforms.time.value += 0.05;
        renderer.render(scene, camera);
    }
    animate();

    // Effet interactif au mouvement de la souris
    document.addEventListener("mousemove", (event) => {
        gsap.to(camera.position, {
            x: (event.clientX / window.innerWidth - 0.5) * 2,
            y: -(event.clientY / window.innerHeight - 0.5) * 2,
            duration: 0.5
        });
    });

    console.log("WebGL Advanced Effect Running!");
});
