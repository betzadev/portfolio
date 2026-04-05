"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const InteractiveImage3D = ({ src, alt }: { src: string; alt: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Grab dimensions of container minus some safe margin
    const width = mountRef.current.clientWidth || 600;
    const height = (width * 9) / 16; 

    const scene = new THREE.Scene();
    
    // Orthographic camera fits the plane precisely on screen
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Plane with enough segments for fluid wave distortion
    const geometry = new THREE.PlaneGeometry(width, height, 40, 40);
    
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
    
    textureLoader.load(src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      material.map = texture;
      material.needsUpdate = true;
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Base vertices to memorize original un-deformed positions
    const positionAttribute = geometry.attributes.position;
    const basePositions: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      basePositions.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, i));
    }

    let mouse = new THREE.Vector2(0, 0);
    let targetMouse = new THREE.Vector2(0, 0);
    let isHovering = false;
    let time = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;
      targetMouse.set(x, y);
    };

    const onMouseEnter = () => (isHovering = true);
    const onMouseLeave = () => {
      isHovering = false;
      targetMouse.set(0, 0);
    };

    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseenter", onMouseEnter);
    renderer.domElement.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId: number;
    const animate = () => {
      time += 0.05;
      
      // Smoothly follow the mouse 
      mouse.lerp(targetMouse, 0.1);

      // Animate vertices in the geometry buffer
      for (let i = 0; i < positionAttribute.count; i++) {
        const base = basePositions[i];
        
        // Use normalized coordinates to compare with mouse
        const normX = base.x / (width / 2);
        const normY = base.y / (height / 2);
        
        const dx = normX - mouse.x;
        const dy = normY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let zOffset = 0;
        
        if (isHovering) {
            // Intense wave on hover
            const wave = Math.sin(dist * 12 - time * 3) * 6; 
            // Only affect vertices near the mouse, tapering off radially
            const force = Math.max(0, 1 - dist * 1.5);
            zOffset = wave * force;
        } else {
            // Very subtle breathing effect when not hovering
            zOffset = Math.sin(normX * 5 + time * 0.5) * 1.5;
        }

        positionAttribute.setXYZ(i, base.x, base.y, zOffset);
      }
      positionAttribute.needsUpdate = true;
      
      // Subtle 3D tilt based on mouse position
      plane.rotation.y = (mouse.x * Math.PI) / 30;
      plane.rotation.x = -(mouse.y * Math.PI) / 30;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
       if(!mountRef.current) return;
       const newWidth = mountRef.current.clientWidth;
       const newHeight = (newWidth * 9) / 16;
       
       camera.left = newWidth / -2;
       camera.right = newWidth / 2;
       camera.top = newHeight / 2;
       camera.bottom = newHeight / -2;
       camera.updateProjectionMatrix();
       
       renderer.setSize(newWidth, newHeight);
       
       // Update geometry to match new dimensions
       plane.scale.set(newWidth / width, newHeight / height, 1);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseenter", onMouseEnter);
      renderer.domElement.removeEventListener("mouseleave", onMouseLeave);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div 
      ref={mountRef} 
      className="interactive-3d-img-container"
      style={{ 
        width: "100%", 
        borderRadius: "0.5rem", 
        overflow: "hidden", 
        cursor: "crosshair",
        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        background: "var(--surface)"
      }} 
    />
  );
};
