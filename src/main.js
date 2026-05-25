import * as THREE from 'three'; 
import { SceneManager } from './core/SceneManager.js'; 
import { CameraManager } from './core/CameraManager.js'; 
import { LightManager } from './core/LightManager.js'; 
import { config } from './config/config.js'; 
class Game { 
    constructor() { 
        this.sceneManager = null; 
        this.cameraManager = null; 
        this.lightManager = null; 
        this.renderer = null; 
        this.scene = null; 
        this.camera = null; 
        this.controls = null; 
        this.clock = new THREE.Clock(); 
        this.spaceship = null; 
    } 
    init() { 
        this.renderer = new THREE.WebGLRenderer({ antialias: true }); 
        this.renderer.setSize(window.innerWidth, window.innerHeight); 
        this.renderer.shadowMap.enabled = true; 
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
        document.body.appendChild(this.renderer.domElement); 
        this.sceneManager = new SceneManager(); 
        this.scene = this.sceneManager.create(); 
        this.cameraManager = new CameraManager(this.renderer); 
        this.camera = this.cameraManager.create(); 
        this.controls = this.cameraManager.createControls(); 
        this.lightManager = new LightManager(this.scene); 
        this.lightManager.createAllLights(); 
        this.createTestObjects(); 
        this.createStars(); 
        window.addEventListener('resize', () =
        this.animate(); 
    } 
    createTestObjects() { 
        const geometry = new THREE.SphereGeometry(1, 64, 64); 
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x44aaff, 
            metalness: 0.7, 
            roughness: 0.3, 
            emissive: 0x112244, 
            emissiveIntensity: 0.3 
        }); 
        const coreSphere = new THREE.Mesh(geometry, material); 
        coreSphere.castShadow = true; 
        coreSphere.receiveShadow = true; 
        this.scene.add(coreSphere); 
        const ringGeometry = new THREE.TorusGeometry(1.4, 0.08, 64, 200); 
        const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.9, roughness: 0.2, emissive: 0x442200, emissiveIntensity: 0.2 }); 
        const ring = new THREE.Mesh(ringGeometry, ringMaterial); 
        ring.rotation.x = Math.PI / 2; 
        ring.castShadow = true; 
        this.scene.add(ring); 
        const ring2Geometry = new THREE.TorusGeometry(1.7, 0.05, 64, 200); 
        const ring2Material = new THREE.MeshStandardMaterial({ color: 0x88ccff, metalness: 0.8, roughness: 0.3 }); 
        const ring2 = new THREE.Mesh(ring2Geometry, ring2Material); 
        ring2.rotation.x = Math.PI / 2 + 0.2; 
        ring2.castShadow = true; 
        this.scene.add(ring2); 
        const gridHelper = new THREE.GridHelper(20, 20, 0x88aaff, 0x335588); 
        gridHelper.position.y = -2; 
        gridHelper.material.transparent = true; 
        gridHelper.material.opacity = 0.3; 
        this.scene.add(gridHelper); 
        this.spaceship = { coreSphere, ring, ring2 }; 
    } 
    createStars() { 
        const starGeometry = new THREE.BufferGeometry(); 
        const starCount = 1500; 
        const starPositions = new Float32Array(starCount * 3); 
        for (let i = 0; i < starCount; i++) { 
            starPositions[i * 3] = (Math.random() - 0.5) * 400; 
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200; 
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 150 - 50; 
        } 
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3)); 
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8 }); 
        const stars = new THREE.Points(starGeometry, starMaterial); 
        this.scene.add(stars); 
        const starColors = [0xffaa66, 0xaaccff, 0xff88aa]; 
        const bigStarsGeometry = new THREE.BufferGeometry(); 
        const bigStarCount = 300; 
        const bigStarPositions = new Float32Array(bigStarCount * 3); 
        const bigStarColors = new Float32Array(bigStarCount * 3); 
        for (let i = 0; i < bigStarCount; i++) { 
            bigStarPositions[i * 3] = (Math.random() - 0.5) * 300; 
            bigStarPositions[i * 3 + 1] = (Math.random() - 0.5) * 150; 
            bigStarPositions[i * 3 + 2] = (Math.random() - 0.5) * 120 - 40; 
            const color = new THREE.Color(starColors[Math.floor(Math.random() * starColors.length)]); 
            bigStarColors[i * 3] = color.r; 
            bigStarColors[i * 3 + 1] = color.g; 
            bigStarColors[i * 3 + 2] = color.b; 
        } 
        bigStarsGeometry.setAttribute('position', new THREE.BufferAttribute(bigStarPositions, 3)); 
        bigStarsGeometry.setAttribute('color', new THREE.BufferAttribute(bigStarColors, 3)); 
        const bigStarMaterial = new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.9 }); 
        const bigStars = new THREE.Points(bigStarsGeometry, bigStarMaterial); 
        this.scene.add(bigStars); 
    } 
    onWindowResize() { 
        this.cameraManager.onWindowResize(); 
        this.renderer.setSize(window.innerWidth, window.innerHeight); 
    } 
    animate() { 
        requestAnimationFrame(() =
        const delta = this.clock.getDelta(); 
        const elapsedTime = this.clock.getElapsedTime(); 
        if (this.spaceship) { 
            this.spaceship.coreSphere.rotation.y = elapsedTime * 0.3; 
            this.spaceship.coreSphere.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2; 
            if (this.spaceship.ring) this.spaceship.ring.rotation.z = elapsedTime * 0.5; 
            if (this.spaceship.ring2) this.spaceship.ring2.rotation.z = -elapsedTime * 0.3; 
        } 
        this.lightManager.update(elapsedTime); 
        this.sceneManager.update(elapsedTime); 
        this.cameraManager.update(); 
        this.renderer.render(this.scene, this.camera); 
    } 
} 
const game = new Game(); 
game.init(); 
