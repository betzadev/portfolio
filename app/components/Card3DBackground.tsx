"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const Card3DBackground = ({ isHovered }: { isHovered: boolean }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Keep it small and performant, it's just a background corner element
    renderer.setSize(160, 160);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Place at bottom right
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.bottom = "-30px";
    renderer.domElement.style.right = "-30px";
    renderer.domElement.style.opacity = "0.1";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.transition = "opacity 0.4s ease";

    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 0);

    let isLightMode = document.documentElement.getAttribute("data-theme") === "light";
    const material = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x04101c : 0x55D6C2,
      wireframe: true,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let currentRotationSpeed = 0.005;

    const observer = new MutationObserver(() => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      material.color.setHex(light ? 0x04101c : 0x55D6C2);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const animate = () => {
      const hovered = mountRef.current?.getAttribute("data-hovered") === "true";

      const targetRotationSpeed = hovered ? 0.04 : 0.005;
      currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.1;

      mesh.rotation.x += currentRotationSpeed;
      mesh.rotation.y += currentRotationSpeed;

      const targetScale = hovered ? 1.6 : 1.0;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Increase opacity on hover
      renderer.domElement.style.opacity = hovered ? "0.3" : "0.1";

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Update hover state via a ref attribute to avoid re-triggering the useEffect
  useEffect(() => {
    if (mountRef.current) {
      mountRef.current.setAttribute("data-hovered", isHovered ? "true" : "false");
    }
  }, [isHovered]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: 0,
        borderRadius: "inherit",
      }}
    />
  );
};
