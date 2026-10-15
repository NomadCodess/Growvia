/**
 * Growvia Botanical Collective - Living Botanical Canopy & Emerald Sky
 * Pure Vanilla JavaScript WebGL Engine
 *
 * Rich botanical aesthetic: Deep pine emerald canopy, soft sunlit chartreuse, and gentle living drift.
 * Completely natural look — calm, subtle, and lag-free (zero CPU/GPU strain, throttled 30 FPS).
 */
(function (global) {
    'use strict';

    const VERTEX_SHADER_SOURCE = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

    // Natural, soft botanical sky gradient with slow gentle canopy drift
    const FRAGMENT_SHADER_SOURCE = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 v_uv;

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_skyTop;
uniform vec3 u_skyBottom;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    float aspect = u_res.x / u_res.y;
    vec2 uv = v_uv;
    float t = u_time * 0.07; // Very slow, calm natural drift

    // Natural emerald & forest sky gradient
    vec3 col = mix(u_skyBottom, u_skyTop, uv.y);

    // Morning conservatory sunlight bloom in top-right
    vec2 sunPos = vec2(0.85, 0.90);
    float sunDist = length(vec2((uv.x - sunPos.x) * aspect, uv.y - sunPos.y));
    vec3 sunLight = vec3(0.92, 1.0, 0.88) * exp(-sunDist * 2.2) * 0.32;
    col += sunLight;

    // Very gentle botanical canopy haze drifting horizontally
    vec2 p = vec2(uv.x * aspect * 1.1 + t * 0.12, uv.y * 2.2);
    float n = vnoise(p) * 0.7 + vnoise(p * 2.0 + 3.1) * 0.3;
    float haze = smoothstep(0.4, 0.8, n) * smoothstep(0.05, 0.65, uv.y);

    col = mix(col, vec3(0.55, 0.88, 0.68), haze * 0.28);

    gl_FragColor = vec4(col, 1.0);
}
`;

    function parseColor(colorStr, fallback) {
        if (!colorStr) return fallback || [0.95, 0.85, 0.75];
        const val = String(colorStr).trim();
        if (val.startsWith('#')) {
            const hex = val.slice(1);
            if (hex.length === 3) {
                return [
                    parseInt(hex[0] + hex[0], 16) / 255,
                    parseInt(hex[1] + hex[1], 16) / 255,
                    parseInt(hex[2] + hex[2], 16) / 255,
                ];
            }
            return [
                parseInt(hex.slice(0, 2), 16) / 255,
                parseInt(hex.slice(2, 4), 16) / 255,
                parseInt(hex.slice(4, 6), 16) / 255,
            ];
        }
        return fallback || [0.95, 0.85, 0.75];
    }

    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function CloudShader(options) {
        options = options || {};

        this.options = {
            canvas: options.canvas || document.getElementById('heroCloudCanvas'),
            container: options.container || document.getElementById('globalCloudContainer') || document.getElementById('heroCloudContainer'),
            speed: typeof options.speed === 'number' ? options.speed : 0.20,
            skyTopColor: options.skyTopColor || '#072b1e',       // Deep botanical pine forest
            skyBottomColor: options.skyBottomColor || '#237a54', // Vibrant living emerald
            maxDpr: 0.75, // Downsampled for zero lag
        };

        this.canvas = typeof this.options.canvas === 'string'
            ? document.getElementById(this.options.canvas)
            : this.options.canvas;

        this.container = typeof this.options.container === 'string'
            ? document.getElementById(this.options.container)
            : this.options.container;

        if (!this.canvas) return;

        this.gl = null;
        this.program = null;
        this.buffer = null;
        this.locations = {};

        this.animFrameId = null;
        this.isRunning = false;
        this.isTabVisible = !document.hidden;
        this.startTime = performance.now();
        this.lastFrameTime = 0;
        this.targetFps = 30; // 30 FPS is perfectly smooth for calm sky and takes ~0% CPU/GPU
        this.frameInterval = 1000 / this.targetFps;

        this.init();
    }

    CloudShader.prototype.init = function () {
        const canvas = this.canvas;
        const glOpts = {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: 'low-power'
        };

        let gl = null;
        try {
            gl = canvas.getContext('webgl', glOpts) || canvas.getContext('experimental-webgl', glOpts);
        } catch (e) {
            console.warn('WebGL init fallback:', e);
        }

        if (!gl) {
            if (this.container) {
                this.container.classList.add('cloud-shader-fallback');
            }
            return;
        }

        this.gl = gl;

        const vert = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
        const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
        if (!vert || !frag) return;

        const program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.bindAttribLocation(program, 0, 'a_pos');
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.deleteProgram(program);
            return;
        }

        this.program = program;
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        this.buffer = buffer;

        this.locations = {
            res: gl.getUniformLocation(program, 'u_res'),
            time: gl.getUniformLocation(program, 'u_time'),
            skyTop: gl.getUniformLocation(program, 'u_skyTop'),
            skyBottom: gl.getUniformLocation(program, 'u_skyBottom')
        };

        this.resize();
        this.setupObservers();
        this.resume();
    };

    CloudShader.prototype.resize = function () {
        if (!this.gl || !this.canvas) return;
        const canvas = this.canvas;
        const target = this.container || canvas;

        const clientW = target.clientWidth || window.innerWidth || 320;
        const clientH = target.clientHeight || window.innerHeight || 240;

        const dpr = Math.min(window.devicePixelRatio || 1, this.options.maxDpr);
        const w = Math.max(64, Math.min(960, Math.floor(clientW * dpr)));
        const h = Math.max(64, Math.min(540, Math.floor(clientH * dpr)));

        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }

        this.gl.viewport(0, 0, w, h);
        this.gl.uniform2f(this.locations.res, w, h);
    };

    CloudShader.prototype.renderFrame = function (now) {
        if (!this.gl || !this.program) return;
        const gl = this.gl;
        const p = this.options;
        const elapsed = ((now - this.startTime) / 1000) * p.speed;

        const skyTop = parseColor(p.skyTopColor, [0.36, 0.22, 0.16]);
        const skyBottom = parseColor(p.skyBottomColor, [0.91, 0.73, 0.61]);

        gl.uniform1f(this.locations.time, elapsed);
        gl.uniform3f(this.locations.skyTop, skyTop[0], skyTop[1], skyTop[2]);
        gl.uniform3f(this.locations.skyBottom, skyBottom[0], skyBottom[1], skyBottom[2]);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    CloudShader.prototype.tick = function (now) {
        if (!this.isRunning) return;
        const delta = now - this.lastFrameTime;
        if (delta >= this.frameInterval) {
            this.lastFrameTime = now - (delta % this.frameInterval);
            this.renderFrame(now);
        }
        this.animFrameId = requestAnimationFrame((t) => this.tick(t));
    };

    CloudShader.prototype.resume = function () {
        if (this.isRunning || !this.gl || !this.isTabVisible) return;
        this.isRunning = true;
        this.lastFrameTime = performance.now();
        this.animFrameId = requestAnimationFrame((t) => this.tick(t));
    };

    CloudShader.prototype.pause = function () {
        this.isRunning = false;
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
    };

    CloudShader.prototype.setupObservers = function () {
        window.addEventListener('resize', () => this.resize(), { passive: true });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isTabVisible = false;
                this.pause();
            } else {
                this.isTabVisible = true;
                this.resume();
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function () {
        const canvas = document.getElementById('heroCloudCanvas');
            const instance = new CloudShader({
                canvas: canvas,
                container: document.getElementById('globalCloudContainer') || document.getElementById('heroCloudContainer'),
                skyTopColor: '#072b1e',       // Deep botanical pine forest
                skyBottomColor: '#237a54',    // Vibrant living emerald
                speed: 0.18
            });
            global.growviaGlobalCloudShader = instance;
            global.plantPalsGlobalCloudShader = instance;  // Backwards compatibility
            global.growGardenGlobalCloudShader = instance; // Backwards compatibility
        }
    });

    global.CloudShader = CloudShader;

})(typeof window !== 'undefined' ? window : this);
