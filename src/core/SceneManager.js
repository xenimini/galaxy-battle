import * as THREE from 'three'; 
import { config } from '../config/config.js'; 
export class SceneManager { 
    constructor() { 
        this.scene = null; 
    } 
    create() { 
        this.scene = new THREE.Scene(); 
        this.scene.background = new THREE.Color(config.scene.backgroundColor); 
        this.scene.fog = new THREE.FogExp2(config.scene.fogColor, config.scene.fogDensity); 
        return this.scene; 
    } 
    getScene() { return this.scene; } 
    update(time) { 
        if (this.scene) { 
            this.scene.userData.time = time; 
        } 
    } 
} 
