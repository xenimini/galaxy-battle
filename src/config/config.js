// Конфигурация приложения 
export const config = { 
    scene: { 
        backgroundColor: 0x050b1a, 
        fogColor: 0x050b1a, 
        fogDensity: 0.008, 
    }, 
    camera: { 
        fov: 45, 
        near: 0.1, 
        far: 1000, 
        position: { x: 5, y: 5, z: 10 }, 
    }, 
    controls: { 
        enableDamping: true, 
        dampingFactor: 0.05, 
        zoomSpeed: 1.2, 
        rotateSpeed: 1.0, 
        panSpeed: 0.8, 
    }, 
    lights: { 
        ambient: { color: 0x404060, intensity: 0.5 }, 
        main: { color: 0xfff5e0, intensity: 1.2, position: { x: 5, y: 10, z: 7 } }, 
        rim: { color: 0x4488ff, intensity: 0.6, position: { x: -3, y: 2, z: -5 } }, 
        fill: { color: 0xffaa66, intensity: 0.4, position: { x: -2, y: 1, z: 3 } }, 
        back: { color: 0x6644ff, intensity: 0.5, position: { x: 0, y: 2, z: -8 } }, 
    }, 
    animation: { 
        lightRotationSpeed: 0.3, 
        lightPulseSpeed: 1.5, 
    }, 
}; 
