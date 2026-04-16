/**
 * 3D Wormhole Geometry Background Animation
 * Ellis wormhole visualization using Three.js
 * Serves as the dynamic background theme for the website
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        wormhole: {
            r0: 1.0,        // Throat radius
            a: 1.0,         // Shape parameter
            segments: 64,   // Geometry segments
            rings: 100,     // Number of rings
            rotationSpeed: 0.0005,
            colorInner: 0x7c3aed,
            colorOuter: 0x06b6d4
        },
        particles: {
            count: 200,
            size: 0.02,
            speed: 0.001
        },
        camera: {
            fov: 75,
            near: 0.1,
            far: 1000,
            initialZ: 8
        }
    };

    // Global variables
    let scene, camera, renderer;
    let wormholeMesh, particleSystem;
    let particles;
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;

    // Initialize Three.js scene
    function init() {
        // Create scene
        scene = new THREE.Scene();

        // Create camera
        camera = new THREE.PerspectiveCamera(
            config.camera.fov,
            window.innerWidth / window.innerHeight,
            config.camera.near,
            config.camera.far
        );
        camera.position.z = config.camera.initialZ;

        // Create renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0a0a0f, 1);

        // Add canvas to DOM
        const container = document.querySelector('.math-bg');
        if (container) {
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
            container.style.background = 'transparent';
        }

        // Create wormhole geometry
        createWormhole();

        // Create particle system
        createParticles();

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add point light at wormhole center
        const pointLight = new THREE.PointLight(0x7c3aed, 1, 100);
        pointLight.position.set(0, 0, 0);
        scene.add(pointLight);

        // Event listeners
        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove, { passive: true });

        // Start animation loop
        animate();
    }

    // Create Ellis wormhole geometry
    function createWormhole() {
        const { r0, a, segments, rings, colorInner, colorOuter } = config.wormhole;

        // Create custom wormhole geometry
        const geometry = new THREE.BufferGeometry();

        const vertices = [];
        const normals = [];
        const colors = [];
        const indices = [];

        // Generate wormhole surface using Ellis metric
        // r(u,v) = r0 * cosh(u/a)
        // Parametric equations for embedding diagram

        for (let i = 0; i <= rings; i++) {
            const u = -3 * a + (6 * a * i) / rings; // u from -3a to 3a
            const cosh = Math.cosh(u / a);
            const r = r0 * cosh;

            for (let j = 0; j <= segments; j++) {
                const v = (2 * Math.PI * j) / segments;

                // Parametric position
                const x = r * Math.cos(v);
                const y = r * Math.sin(v);
                const z = u;

                vertices.push(x, y, z);

                // Calculate normal (approximate)
                const normal = new THREE.Vector3(x, y, -u * 0.1).normalize();
                normals.push(normal.x, normal.y, normal.z);

                // Color gradient based on z position
                const t = (u + 3 * a) / (6 * a);
                const color = new THREE.Color();
                color.lerpColors(
                    new THREE.Color(colorInner),
                    new THREE.Color(colorOuter),
                    t
                );
                colors.push(color.r, color.g, color.b);
            }
        }

        // Create indices for triangle mesh
        for (let i = 0; i < rings; i++) {
            for (let j = 0; j < segments; j++) {
                const a_idx = i * (segments + 1) + j;
                const b_idx = a_idx + 1;
                const c_idx = (i + 1) * (segments + 1) + j;
                const d_idx = c_idx + 1;

                indices.push(a_idx, c_idx, b_idx);
                indices.push(b_idx, c_idx, d_idx);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setIndex(indices);

        // Create wireframe overlay
        const wireframeGeometry = new THREE.WireframeGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x9f67ff,
            transparent: true,
            opacity: 0.15
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

        // Create main material
        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide,
            wireframe: false
        });

        wormholeMesh = new THREE.Mesh(geometry, material);
        wormholeMesh.add(wireframe);
        scene.add(wormholeMesh);
    }

    // Create particle system for depth effect
    function createParticles() {
        const { count, size, speed } = config.particles;

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const velocities = [];

        for (let i = 0; i < count; i++) {
            // Random position in a sphere around the wormhole
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 10;

            positions.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            velocities.push(
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x7c3aed,
            size: size,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        particleSystem = new THREE.Points(geometry, material);
        particleSystem.userData.velocities = velocities;
        scene.add(particleSystem);
    }

    // Window resize handler
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Mouse move handler for parallax effect
    function onMouseMove(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // Touch move handler for mobile
    function onTouchMove(event) {
        if (event.touches.length > 0) {
            mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Rotate wormhole slowly
        if (wormholeMesh) {
            wormholeMesh.rotation.y += config.wormhole.rotationSpeed;
            wormholeMesh.rotation.x += config.wormhole.rotationSpeed * 0.5;

            // Add subtle pulsing effect
            const scale = 1 + Math.sin(time * 0.5) * 0.02;
            wormholeMesh.scale.set(scale, scale, scale);

            // Mouse-based rotation (parallax)
            targetRotationX = mouseY * 0.3;
            targetRotationY = mouseX * 0.3;

            wormholeMesh.rotation.x += (targetRotationX - wormholeMesh.rotation.x) * 0.05;
            wormholeMesh.rotation.y += (targetRotationY - wormholeMesh.rotation.y) * 0.05;
        }

        // Animate particles
        if (particleSystem) {
            const positions = particleSystem.geometry.attributes.position.array;
            const velocities = particleSystem.userData.velocities;

            for (let i = 0; i < positions.length / 3; i++) {
                positions[i * 3] += velocities[i * 3];
                positions[i * 3 + 1] += velocities[i * 3 + 1];
                positions[i * 3 + 2] += velocities[i * 3 + 2];

                // Wrap around
                const pos = new THREE.Vector3(
                    positions[i * 3],
                    positions[i * 3 + 1],
                    positions[i * 3 + 2]
                );

                if (pos.length() > 15) {
                    const newTheta = Math.random() * Math.PI * 2;
                    const newPhi = Math.acos(2 * Math.random() - 1);
                    const newRadius = 5;

                    positions[i * 3] = newRadius * Math.sin(newPhi) * Math.cos(newTheta);
                    positions[i * 3 + 1] = newRadius * Math.sin(newPhi) * Math.sin(newTheta);
                    positions[i * 3 + 2] = newRadius * Math.cos(newPhi);
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y = time * 0.05;
        }

        // Gentle camera movement
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
