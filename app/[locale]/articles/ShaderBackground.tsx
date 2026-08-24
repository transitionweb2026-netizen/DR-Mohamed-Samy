"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// The Glass Question Shader
// Visualizes a subtle, refractive 3D question mark that transforms into a light path

void main() {
    vec2 uv = v_texCoord;
    vec2 centered_uv = uv - 0.5;
    centered_uv.x *= u_resolution.x / u_resolution.y;

    // Pulse effect
    float t = u_time * 0.5;

    // Abstract Question Mark shape (using arcs and lines)
    float dist = 10.0;

    // Top arc
    vec2 arcPos = centered_uv - vec2(0.0, 0.15);
    float arc = abs(length(arcPos) - 0.15);
    if(arcPos.y > -0.05 && atan(arcPos.y, arcPos.x) > -0.5) dist = min(dist, arc);

    // Middle curve
    vec2 curvePos = centered_uv - vec2(0.0, -0.05);
    float curve = abs(length(curvePos - vec2(0.05, 0.0)) - 0.1);
    // dist = min(dist, curve); // Simplified for performance

    // Dot
    float dot = length(centered_uv - vec2(0.0, -0.25)) - 0.02;
    dist = min(dist, dot);

    // Refraction and Glow
    float glow = smoothstep(0.05, 0.0, dist);
    float pulse = sin(u_time * 2.0) * 0.5 + 0.5;

    // Color Palette (#18D5B8)
    vec3 primaryTeal = vec3(0.094, 0.835, 0.722);
    vec3 highlightCyan = vec3(0.35, 1.0, 0.91);

    vec3 color = primaryTeal * glow * 0.5;
    color += highlightCyan * pow(glow, 3.0) * pulse;

    // Refractive glints
    float glint = pow(max(0.0, 1.0 - dist * 10.0), 10.0) * pulse;
    color += glint * 0.3;

    float alpha = smoothstep(0.6, 0.2, length(centered_uv)) * 0.4;

    gl_FragColor = vec4(color, alpha);
}`;

// Ported near-verbatim from the source page's inline WebGL shader script
// ("The Glass Question" background animation on the final CTA section) --
// same vertex/fragment shaders, same render loop. Only the setup/teardown
// is adapted to a React ref + effect (with proper cleanup on unmount,
// since this component can now unmount during client-side navigation,
// unlike the original standalone page).
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext(
        "experimental-webgl",
      )) as WebGLRenderingContext | null;
    if (!gl) return;

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let rafId = 0;
    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-60">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        height={558}
        width={1280}
      />
    </div>
  );
}
