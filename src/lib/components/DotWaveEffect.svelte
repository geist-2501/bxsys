<script>
    import { onMount } from "svelte"
    import * as THREE from "three"

    let mount
    let scene
    let camera
    let particles
    let renderer

    let count = 0
    
    const AMOUNTX = 25
    const AMOUNTY = 25
    const SEPARATION = 100

    const vertexShader = `
    attribute float scale;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = scale * ( 300.0 / - mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }`

    const fragmentShader = `
    uniform vec3 color;
    void main() {
        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
        gl_FragColor = vec4( color, 1.0 );
    }`
    
    function getShaderMaterial() {
        return new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0x0036BF) },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })
    }

    function animate() {
        requestAnimationFrame(() => animate());

        renderAnim();
    }

    function renderAnim() {
        const positions = particles.geometry.attributes.position.array
        const scales = particles.geometry.attributes.scale.array

        let i = 0
        let j = 0

        for (let ix = 0; ix < AMOUNTX; ix += 1) {
            for (let iy = 0; iy < AMOUNTY; iy += 1) {
                positions[i + 1] = (Math.sin((ix + count) * 0.3) * 50)
                    + (Math.sin((iy + count) * 0.5) * 50)

                scales[j] = (Math.sin((ix + count) * 0.3) + 1) * 20
                    + (Math.sin((iy + count) * 0.5) + 1) * 20

                i += 3
                j += 1
            }

        }

        particles.geometry.attributes.position.needsUpdate = true
        particles.geometry.attributes.scale.needsUpdate = true

        renderer.render(scene, camera)

        count += 0.1
    }

    onMount(() => {
        camera = new THREE.PerspectiveCamera(50, document.body.clientWidth / document.body.clientHeight, 1, 10000)
        camera.position.x = 1000;
        camera.position.y = 1000;
        camera.position.z = 1000;

        scene = new THREE.Scene();

        const offset = new THREE.Vector3(200, 0, 200);
        camera.lookAt(offset.add(scene.position));

        const material = getShaderMaterial();

        const numParticles = AMOUNTX * AMOUNTY;

        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0;
        let j = 0;

        for (let ix = 0; ix < AMOUNTX; ix += 1) {

            for (let iy = 0; iy < AMOUNTY; iy += 1) {

                positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z

                scales[j] = 1;

                i += 3;
                j += 1;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(document.body.clientWidth, document.body.clientHeight);
        renderer.setClearColor(0x000000);

        mount.appendChild(renderer.domElement);

        animate()
    })
</script>

<div bind:this={mount}></div>