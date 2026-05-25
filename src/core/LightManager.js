import * as THREE from 'three'; 
import { config } from '../config/config.js'; 
export class LightManager { 
    constructor(scene) { 
        this.scene = scene; 
        this.ambientLight = null; 
        this.mainLight = null; 
        this.rimLight = null; 
        this.fillLight = null; 
        this.backLight = null; 
        this.initialMainPos = null; 
    } 
    _createAmbientLight() { 
        this.ambientLight = new THREE.AmbientLight( 
            config.lights.ambient.color, 
            config.lights.ambient.intensity 
        ); 
        this.scene.add(this.ambientLight); 
    } 
    _createMainLight() { 
        this.mainLight = new THREE.DirectionalLight( 
            config.lights.main.color, 
            config.lights.main.intensity 
        ); 
        this.mainLight.position.set( 
            config.lights.main.position.x, 
            config.lights.main.position.y, 
            config.lights.main.position.z 
        ); 
        this.mainLight.castShadow = true; 
        this.mainLight.receiveShadow = true; 
        this.mainLight.shadow.mapSize.width = 1024; 
        this.mainLight.shadow.mapSize.height = 1024; 
        this.mainLight.shadow.camera.near = 0.5; 
        this.mainLight.shadow.camera.far = 50; 
        this.mainLight.shadow.camera.left = -10; 
        this.mainLight.shadow.camera.right = 10; 
        this.mainLight.shadow.camera.top = 10; 
        this.mainLight.shadow.camera.bottom = -10; 
        this.initialMainPos = this.mainLight.position.clone(); 
        this.scene.add(this.mainLight); 
    } 
    _createRimLight() { 
        this.rimLight = new THREE.PointLight( 
            config.lights.rim.color, 
            config.lights.rim.intensity 
        ); 
        this.rimLight.position.set( 
            config.lights.rim.position.x, 
            config.lights.rim.position.y, 
            config.lights.rim.position.z 
        ); 
        this.scene.add(this.rimLight); 
    } 
    _createFillLight() { 
        this.fillLight = new THREE.PointLight( 
            config.lights.fill.color, 
            config.lights.fill.intensity 
        ); 
        this.fillLight.position.set( 
            config.lights.fill.position.x, 
            config.lights.fill.position.y, 
            config.lights.fill.position.z 
        ); 
        this.scene.add(this.fillLight); 
    } 
    _createBackLight() { 
        this.backLight = new THREE.PointLight( 
            config.lights.back.color, 
            config.lights.back.intensity 
        ); 
        this.backLight.position.set( 
            config.lights.back.position.x, 
            config.lights.back.position.y, 
            config.lights.back.position.z 
        ); 
        this.scene.add(this.backLight); 
    } 
    createAllLights() { 
        this._createAmbientLight(); 
        this._createMainLight(); 
        this._createRimLight(); 
        this._createFillLight(); 
        this._createBackLight(); 
    } 
    update(time) { 
            const angle = time * config.animation.lightRotationSpeed; 
            const radius = 8; 
            this.mainLight.position.x = this.initialMainPos.x + Math.sin(angle) * 2; 
            this.mainLight.position.z = this.initialMainPos.z + Math.cos(angle * 0.7) * 2; 
            const pulse = 0.8 + Math.sin(time * config.animation.lightPulseSpeed) * 0.2; 
            this.mainLight.intensity = config.lights.main.intensity * pulse; 
        } 
        if (this.rimLight) { 
            const pulseRim = 0.7 + Math.sin(time * 1.2) * 0.3; 
            this.rimLight.intensity = config.lights.rim.intensity * pulseRim; 
        } 
        if (this.fillLight) { 
            const pulseFill = 0.6 + Math.cos(time * 0.8) * 0.2; 
            this.fillLight.intensity = config.lights.fill.intensity * pulseFill; 
        } 
        if (this.backLight) { 
            const pulseBack = 0.5 + Math.sin(time * 0.5) * 0.5; 
            this.backLight.intensity = config.lights.back.intensity * pulseBack; 
        } 
    } 
} 
