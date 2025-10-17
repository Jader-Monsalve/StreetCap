import React, { useEffect, useRef } from 'react';

interface CapViewer3DProps {
  capType?: string;
}

export default function CapViewer3D({ capType = 'baseball' }: CapViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCapViewer = async () => {
      if (!containerRef.current) {
        console.error('Container not found');
        return;
      }

      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        console.log('Initializing StreetCap 3D viewer');

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a3e);

        const width = containerRef.current.clientWidth || 400;
        const height = containerRef.current.clientHeight || 400;

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(0, 0.3, 2.2);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;

        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);

        // ===== LIGHTING =====
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(15, 15, 15);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0xccccff, 0.6);
        pointLight1.position.set(-15, 8, 15);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffcccc, 0.4);
        pointLight2.position.set(15, 4, -12);
        scene.add(pointLight2);

        // ===== CREATE PROCEDURAL CAP (Fallback) =====
        const createProceduralCap = (): any => {
          const capGroup = new THREE.Group();

          // Fabric texture
          const fabricCanvas = document.createElement('canvas');
          fabricCanvas.width = 512;
          fabricCanvas.height = 512;
          const fabricCtx = fabricCanvas.getContext('2d');
          if (fabricCtx) {
            fabricCtx.fillStyle = '#d0d0d0';
            fabricCtx.fillRect(0, 0, 512, 512);
            fabricCtx.strokeStyle = 'rgba(0,0,0,0.08)';
            for (let i = 0; i < 512; i += 3) {
              fabricCtx.beginPath();
              fabricCtx.moveTo(i, 0);
              fabricCtx.lineTo(i, 512);
              fabricCtx.stroke();
            }
            for (let i = 0; i < 512; i += 3) {
              fabricCtx.beginPath();
              fabricCtx.moveTo(0, i);
              fabricCtx.lineTo(512, i);
              fabricCtx.stroke();
            }
          }
          const fabricTexture = new THREE.CanvasTexture(fabricCanvas);
          fabricTexture.repeat.set(3, 3);
          fabricTexture.wrapS = THREE.RepeatWrapping;
          fabricTexture.wrapT = THREE.RepeatWrapping;

          // Front panel
          const frontGeo = new THREE.SphereGeometry(1.0, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.45);
          const frontMat = new THREE.MeshStandardMaterial({
            color: 0xd0d0d0,
            map: fabricTexture,
            roughness: 0.85,
            metalness: 0.0
          });
          const frontPanel = new THREE.Mesh(frontGeo, frontMat);
          frontPanel.position.y = 0.4;
          frontPanel.scale.set(1.0, 0.65, 0.95);
          capGroup.add(frontPanel);

          // Visor
          const visorGeo = new THREE.BoxGeometry(2.0, 0.2, 0.9);
          const visorMat = new THREE.MeshStandardMaterial({
            color: 0xd0d0d0,
            map: fabricTexture,
            roughness: 0.8
          });
          const visor = new THREE.Mesh(visorGeo, visorMat);
          visor.position.set(0, -0.05, 0.6);
          visor.rotation.z = -0.12;
          capGroup.add(visor);

          // Button
          const buttonGeo = new THREE.SphereGeometry(0.16, 32, 32);
          const buttonMat = new THREE.MeshStandardMaterial({
            color: 0xfbbf24,
            roughness: 0.3,
            metalness: 0.7
          });
          const button = new THREE.Mesh(buttonGeo, buttonMat);
          button.position.y = 0.85;
          capGroup.add(button);

          // Eyelets
          for (let i = 0; i < 3; i++) {
            const eyeletGeo = new THREE.TorusGeometry(0.095, 0.02, 20, 10);
            const eyeletMat = new THREE.MeshStandardMaterial({
              color: 0x888888,
              roughness: 0.6,
              metalness: 0.5
            });
            const eyelet = new THREE.Mesh(eyeletGeo, eyeletMat);
            eyelet.position.set((i - 1) * 0.5, 0.45, 0.15);
            eyelet.rotation.y = Math.PI / 2;
            capGroup.add(eyelet);
          }

          return capGroup;
        };

        // ===== TRY LOADING GLB MODELS =====
        let capModel: any = null;
        const glbUrls = [
          '/models/baseball_cap.glb',
          'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/models/gltf/Horse.glb',
          'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/models/gltf/Parrot.glb',
          'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/models/gltf/Soldier.glb',
        ];

        const loader = new GLTFLoader();

        for (const url of glbUrls) {
          try {
            const fileName = url.split('/').pop();
            console.log(`📦 Attempting to load: ${fileName}`);
            const gltf = await new Promise<any>((resolve, reject) => {
              const timeout = setTimeout(() => reject(new Error('Timeout')), 8000);
              loader.load(
                url,
                (data) => {
                  clearTimeout(timeout);
                  resolve(data);
                },
                undefined,
                (error) => {
                  clearTimeout(timeout);
                  reject(error);
                }
              );
            });

            capModel = gltf.scene;
            console.log(`✓ GLB Model loaded successfully: ${fileName}`);
            break;
          } catch (err) {
            const fileName = url.split('/').pop();
            console.warn(`✗ Failed to load ${fileName}`);
            continue;
          }
        }

        // Use procedural cap if no GLB loaded
        if (!capModel) {
          console.log('📐 Using procedural cap model');
          capModel = createProceduralCap();
        } else {
          // Adjust scale of GLB model
          console.log('🔧 Adjusting GLB model scale and position');
          
          const box = new THREE.Box3().setFromObject(capModel);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.2 / maxDim;
          capModel.scale.multiplyScalar(scale);
          
          box.setFromObject(capModel);
          const center = box.getCenter(new THREE.Vector3());
          capModel.position.sub(center);
          
          console.log(`✓ Model scaled to: ${scale.toFixed(2)}`);
        }

        capModel.castShadow = true;
        capModel.receiveShadow = true;
        
        // Register all materials
        let materialCount = 0;
        capModel.traverse((child: any) => {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            materialCount++;
            if (Array.isArray(child.material)) {
              console.log(`✓ Found ${child.material.length} multi-materials in: ${child.name}`);
            } else {
              console.log(`✓ Found material in: ${child.name}`);
            }
          }
        });
        console.log(`📦 Total objects with materials: ${materialCount}`);

        scene.add(capModel);

        // ===== INTERACTIONS =====
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let autoRotate = true;

        renderer.domElement.addEventListener('mousedown', (e: any) => {
          isDragging = true;
          previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        renderer.domElement.addEventListener('mousemove', (e: any) => {
          if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            capModel.rotation.y += deltaX * 0.008;
            capModel.rotation.x += deltaY * 0.008;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            autoRotate = false;
          }
        });

        renderer.domElement.addEventListener('mouseup', () => {
          isDragging = false;
        });

        // Zoom with mouse wheel
        renderer.domElement.addEventListener('wheel', (e: WheelEvent) => {
          e.preventDefault();
          const zoomSpeed = 0.1;
          const direction = e.deltaY > 0 ? 1 : -1;
          camera.position.z += direction * zoomSpeed;
          camera.position.z = Math.max(0.5, Math.min(6, camera.position.z));
        }, { passive: false });

        // Touch controls
        renderer.domElement.addEventListener('touchstart', (e: any) => {
          isDragging = true;
          previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        });

        renderer.domElement.addEventListener('touchmove', (e: any) => {
          if (isDragging) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;
            capModel.rotation.y += deltaX * 0.008;
            capModel.rotation.x += deltaY * 0.008;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        });

        renderer.domElement.addEventListener('touchend', () => {
          isDragging = false;
        });

        // Animation loop
        function animate() {
          requestAnimationFrame(animate);
          
          if (autoRotate && !isDragging) {
            capModel.rotation.y += 0.003;
          }
          
          renderer.render(scene, camera);
        }
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
          const w = containerRef.current?.clientWidth || 400;
          const h = containerRef.current?.clientHeight || 400;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });

        // ===== GLOBAL COLOR FUNCTIONS =====
        // Helper function to apply color to all materials
        const applyColorToAll = (color: string, exclude: string[] = []) => {
          capModel.traverse((child: any) => {
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat: any) => {
                  if (mat.color) {
                    mat.color.setStyle(color);
                  }
                });
              } else if (child.material.color) {
                child.material.color.setStyle(color);
              }
            }
          });
        };

        (window as any).changeCapColor = (color: string) => {
          console.log(`🎨 Changing cap color to: ${color}`);
          applyColorToAll(color);
        };

        (window as any).changeVisorColor = (color: string) => {
          console.log(`🎨 Changing visor color to: ${color}`);
          applyColorToAll(color);
        };

        (window as any).changeBandColor = (color: string) => {
          console.log(`🎨 Changing band color to: ${color}`);
          applyColorToAll(color);
        };

        (window as any).changeButtonColor = (color: string) => {
          console.log(`🎨 Changing button color to: ${color}`);
          applyColorToAll(color);
        };

        (window as any).toggleAutoRotate = () => {
          autoRotate = !autoRotate;
        };

        (window as any).resetView = () => {
          capModel.rotation.set(0, 0, 0);
          autoRotate = true;
        };

        (window as any).downloadDesign = () => {
          const link = document.createElement('a');
          link.href = renderer.domElement.toDataURL('image/png');
          link.download = 'mi-gorra-streetcap.png';
          link.click();
        };

        (window as any).shareDesign = () => {
          if (navigator.share) {
            navigator.share({
              title: 'Mi gorra StreetCap',
              text: '¡Diseñé esta gorra en StreetCap! 🧢',
              url: window.location.href,
            });
          } else {
            alert('Comparte este enlace: ' + window.location.href);
          }
        };

      } catch (error) {
        console.error('Error initializing cap viewer:', error);
      }
    };

    const timer = setTimeout(initCapViewer, 150);
    return () => clearTimeout(timer);
  }, [capType]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
