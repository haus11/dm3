var SYNERGY = SYNERGY || {};
SYNERGY.Earth = SYNERGY.Earth || {revision: '1'};

SYNERGY.Earth = function(_settings)
{
    var webglEl = document.getElementById('mainView');

    var width = window.innerWidth,
        height = window.innerHeight;

// Earth params
    var radius = 0.5,
        segments = 32,
        rotation = 6;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 1.5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    scene.add(new THREE.AmbientLight(0xffffff));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);

    var sphere = createSphere(radius, segments);
    sphere.rotation.y = rotation;
    scene.add(sphere)

    //var clouds = createClouds(radius, segments);
    //clouds.rotation.y = rotation;
    //scene.add(clouds)

    //var stars = createStars(90, 64);
    //scene.add(stars);

    //var controls = new THREE.TrackballControls(camera);

    webglEl.appendChild(renderer.domElement);

    render();

    function render() {
        //controls.update();
        sphere.rotation.y += 0.0005;
        //clouds.rotation.y += 0.0005;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('assets/img/8081_earthmap4k.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('assets/img/8081_earthbump4k.jpg'),
                bumpScale: 0.009,
                specularMap: THREE.ImageUtils.loadTexture('assets/img/8081_earthspec4k.jpg'),
                specular: new THREE.Color('grey')
            })
            );
    }

    function createClouds(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius + 0.003, segments, segments),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('assets/img/fair_clouds_4k.png'),
                transparent: true
            })
            );
    }

    function createStars(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
                side: THREE.BackSide
            })
            );
    }
};

var test = new SYNERGY.Earth({debug: true});