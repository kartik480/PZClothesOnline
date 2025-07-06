import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const ThreeDModel = ({ 
  selectedColor, 
  selectedStyle, 
  selectedFilterDressType, 
  rotationAngle, 
  modelPath = '/models/tshirt.obj',
  materialPath = '/models/tshirt.mtl'
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup - adjusted for better view
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8); // Moved camera back for better view
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf8f9fa, 1);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.6);
    pointLight2.position.set(0, -5, 5);
    scene.add(pointLight2);

    // Load 3D model
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    console.log('Loading model from:', modelPath);
    console.log('Loading material from:', materialPath);

    // Try to load material first, then object
    mtlLoader.load(
      materialPath,
      (materials) => {
        console.log('Material loaded successfully');
        materials.preload();
        objLoader.setMaterials(materials);
        
        objLoader.load(
          modelPath,
          (object) => {
            console.log('OBJ model loaded successfully');
            
            // Center the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.sub(center);
            
            // Scale the model appropriately
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim; // Increased scale for better visibility
            object.scale.setScalar(scale);
            
            // Apply color to all materials
            object.traverse((child) => {
              if (child.isMesh) {
                if (child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                      mat.color.setHex(selectedColor.replace('#', '0x'));
                      mat.needsUpdate = true;
                    });
                  } else {
                    child.material.color.setHex(selectedColor.replace('#', '0x'));
                    child.material.needsUpdate = true;
                  }
                }
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            scene.add(object);
            modelRef.current = object;
            setIsLoading(false);
            console.log('Model added to scene');
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
            console.error('Error loading OBJ file:', error);
            setError('Failed to load 3D model');
            setIsLoading(false);
            // Create a fallback cube
            createFallbackModel();
          }
        );
      },
      (progress) => {
        console.log('Loading material progress:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading MTL file:', error);
        // Try loading without material
        objLoader.load(
          modelPath,
          (object) => {
            console.log('OBJ model loaded without material');
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());
            object.position.sub(center);
            
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim;
            object.scale.setScalar(scale);
            
            // Apply basic material with color
            object.traverse((child) => {
              if (child.isMesh) {
                const material = new THREE.MeshLambertMaterial({
                  color: selectedColor.replace('#', '0x'),
                  transparent: true,
                  opacity: 0.9
                });
                child.material = material;
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            scene.add(object);
            modelRef.current = object;
            setIsLoading(false);
            console.log('Model added to scene without material');
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
            console.error('Error loading OBJ file:', error);
            setError('Failed to load 3D model');
            setIsLoading(false);
            // Create a fallback model
            createFallbackModel();
          }
        );
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (modelRef.current) {
        // Apply rotation based on rotationAngle prop
        modelRef.current.rotation.y = THREE.MathUtils.degToRad(rotationAngle);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current && renderer && camera) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath, materialPath, rotationAngle]);

  // Update color when selectedColor changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.color.setHex(selectedColor.replace('#', '0x'));
              mat.needsUpdate = true;
            });
          } else {
            child.material.color.setHex(selectedColor.replace('#', '0x'));
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [selectedColor]);

  // Create fallback model if OBJ loading fails
  const createFallbackModel = () => {
    if (!sceneRef.current) return;

    console.log('Creating fallback model');
    
    // Create a simple t-shirt shape using geometry
    const group = new THREE.Group();

    // Body of the t-shirt
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 0.3);
    const bodyMaterial = new THREE.MeshLambertMaterial({
      color: selectedColor.replace('#', '0x'),
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Sleeves
    const sleeveGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 8);
    const sleeveMaterial = new THREE.MeshLambertMaterial({
      color: selectedColor.replace('#', '0x'),
      transparent: true,
      opacity: 0.9
    });

    const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    leftSleeve.position.set(-1.2, 0.5, 0);
    leftSleeve.rotation.z = Math.PI / 2;
    leftSleeve.castShadow = true;
    leftSleeve.receiveShadow = true;
    group.add(leftSleeve);

    const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
    rightSleeve.position.set(1.2, 0.5, 0);
    rightSleeve.rotation.z = -Math.PI / 2;
    rightSleeve.castShadow = true;
    rightSleeve.receiveShadow = true;
    group.add(rightSleeve);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
    const neckMaterial = new THREE.MeshLambertMaterial({
      color: selectedColor.replace('#', '0x'),
      transparent: true,
      opacity: 0.9
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.set(0, 1.2, 0);
    neck.castShadow = true;
    neck.receiveShadow = true;
    group.add(neck);

    // Add hood if it's a hoodie
    if (selectedFilterDressType === 'Hoodie') {
      const hoodGeometry = new THREE.SphereGeometry(0.8, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      const hoodMaterial = new THREE.MeshLambertMaterial({
        color: selectedColor.replace('#', '0x'),
        transparent: true,
        opacity: 0.9
      });
      const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
      hood.position.set(0, 1.8, 0);
      hood.castShadow = true;
      hood.receiveShadow = true;
      group.add(hood);
    }

    // Scale based on style
    let scale = 1;
    switch (selectedStyle) {
      case 'slim':
        scale = 0.8;
        break;
      case 'oversized':
        scale = 1.3;
        break;
      case 'muscle':
        scale = 1.1;
        break;
      default:
        scale = 1;
    }
    group.scale.setScalar(scale);

    sceneRef.current.add(group);
    modelRef.current = group;
    console.log('Fallback model created and added to scene');
  };

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #2c1f3d 0%, #4a2c6d 50%, #6b3fa0 100%)'
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          Loading 3D Model...
        </div>
      )}
      {error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          color: '#ff6b6b',
          fontSize: '14px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {error}<br />
          <small>Using fallback model</small>
        </div>
      )}
    </div>
  );
};

export default ThreeDModel; 