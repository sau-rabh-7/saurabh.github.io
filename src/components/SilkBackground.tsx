
/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useRef, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";
import { usePortfolio } from '@/contexts/PortfolioContext';

const hexToNormalizedRGB = (hex: string) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

interface SilkPlaneProps {
  uniforms: {
    uSpeed: { value: number };
    uScale: { value: number };
    uNoiseIntensity: { value: number };
    uColor: { value: Color };
    uRotation: { value: number };
    uTime: { value: number };
  };
}

const SilkPlane = forwardRef<any, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.material.uniforms.uTime.value += 0.1 * delta;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        attach="material"
        args={[{
          uniforms,
          vertexShader,
          fragmentShader,
        }]}
      />
    </mesh>
  );
});

const SilkBackground: React.FC = () => {
  const { data } = usePortfolio();
  const { backgroundSettings } = data;
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: backgroundSettings.speed },
      uScale: { value: backgroundSettings.scale },
      uNoiseIntensity: { value: backgroundSettings.noise },
      uColor: { value: new Color(...hexToNormalizedRGB(backgroundSettings.color)) },
      uRotation: { value: backgroundSettings.rotation },
      uTime: { value: 0 },
    }),
    [backgroundSettings]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas dpr={[1, 2]} frameloop="always">
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default SilkBackground;
