import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { config } from '../config/config.js'; 
export class CameraManager { 
    constructor(renderer) { 
        this.camera = null; 
        this.controls = null; 
        this.renderer = renderer; 
    } 
    create() { 
        this.camera = new THREE.PerspectiveCamera( 
            config.camera.fov, 
            window.innerWidth / window.innerHeight, 
            config.camera.near, 
            config.camera.far 
        ); 
        this.camera.position.set( 
            config.camera.position.x, 
            config.camera.position.y, 
            config.camera.position.z 
        ); 
        return this.camera; 
    } 
    createControls() { 
        this.controls = new OrbitControls(this.camera, this.renderer.domElement); 
        this.controls.enableDamping = config.controls.enableDamping; 
        this.controls.dampingFactor = config.controls.dampingFactor; 
        this.controls.zoomSpeed = config.controls.zoomSpeed; 
        this.controls.rotateSpeed = config.controls.rotateSpeed; 
        this.controls.panSpeed = config.controls.panSpeed; 
        return this.controls; 
    } 
    onWindowResize() { 
        if (this.camera) { 
            this.camera.aspect = window.innerWidth / window.innerHeight; 
            this.camera.updateProjectionMatrix(); 
        } 
    } 
    update() { 
        if (this.controls) { 
            this.controls.update(); 
        } 
    } 
} 
