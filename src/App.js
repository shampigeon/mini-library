import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const LANE_LIMIT = 7;
const HEIGHT_LIMIT = 6;
const PLAYER_SPEED = 0.22;
const BULLET_SPEED = 2;
const WORLD_SPEED = 0.65;
const SPAWN_DISTANCE = 180;
const CAMERA_OFFSET_Z = 18;

const randomRange = (min, max) => Math.random() * (max - min) + min;

const createObstacle = (z) => {
  const isBreakable = Math.random() > 0.45;

  return {
    id: `${Date.now()}-${Math.random()}`,
    type: isBreakable ? 'barrier' : 'mountain',
    x: randomRange(-LANE_LIMIT, LANE_LIMIT),
    y: isBreakable ? randomRange(-1.5, 3) : randomRange(-2.5, 0),
    z,
    width: isBreakable ? randomRange(1.8, 2.8) : randomRange(3.5, 6),
    height: isBreakable ? randomRange(2.5, 4.5) : randomRange(4.5, 9),
    depth: isBreakable ? 3 : 8,
  };
};

function App() {
  const canvasRef = useRef(null);
  const pressedRef = useRef({});
  const gameRef = useRef({
    player: { x: 0, y: 1.2, z: 0 },
    bullets: [],
    obstacles: [],
    stats: { score: 0, destroyed: 0, hits: 0 },
    nextSpawnZ: 35,
  });

  const [hud, setHud] = useState({ score: 0, destroyed: 0, hits: 0 });

  useEffect(() => {
    const keyDown = (event) => {
      pressedRef.current[event.code] = true;
      if (event.code === 'Space') {
        event.preventDefault();
      }
    };

    const keyUp = (event) => {
      pressedRef.current[event.code] = false;
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    let previousTime = performance.now();

    const update = (delta) => {
      const game = gameRef.current;
      const keys = pressedRef.current;
      const move = PLAYER_SPEED * delta;

      if (keys.ArrowLeft || keys.KeyA) {
        game.player.x = Math.max(-LANE_LIMIT, game.player.x - move);
      }
      if (keys.ArrowRight || keys.KeyD) {
        game.player.x = Math.min(LANE_LIMIT, game.player.x + move);
      }
      if (keys.ArrowUp || keys.KeyW) {
        game.player.y = Math.min(HEIGHT_LIMIT, game.player.y + move);
      }
      if (keys.ArrowDown || keys.KeyS) {
        game.player.y = Math.max(0.2, game.player.y - move);
      }

      if (keys.Space && (!game.lastShotTime || performance.now() - game.lastShotTime > 130)) {
        game.bullets.push({
          x: game.player.x,
          y: game.player.y + 0.15,
          z: game.player.z + 6,
        });
        game.lastShotTime = performance.now();
      }

      game.player.z += WORLD_SPEED * delta;
      game.stats.score += WORLD_SPEED * delta * 2;

      while (game.nextSpawnZ < game.player.z + SPAWN_DISTANCE) {
        game.obstacles.push(createObstacle(game.nextSpawnZ));
        game.nextSpawnZ += randomRange(11, 20);
      }

      const bulletStep = BULLET_SPEED * delta;
      game.bullets = game.bullets
        .map((bullet) => ({ ...bullet, z: bullet.z + bulletStep }))
        .filter((bullet) => bullet.z < game.player.z + SPAWN_DISTANCE + 80);

      const nextObstacles = [];
      game.obstacles.forEach((obstacle) => {
        let destroyed = false;

        if (obstacle.type === 'barrier') {
          for (let i = 0; i < game.bullets.length; i += 1) {
            const bullet = game.bullets[i];
            const nearX = Math.abs(bullet.x - obstacle.x) < obstacle.width * 0.45;
            const nearY = Math.abs(bullet.y - obstacle.y) < obstacle.height * 0.5;
            const nearZ = Math.abs(bullet.z - obstacle.z) < obstacle.depth;

            if (nearX && nearY && nearZ) {
              destroyed = true;
              game.bullets.splice(i, 1);
              game.stats.destroyed += 1;
              game.stats.score += 55;
              break;
            }
          }
        }

        if (!destroyed && obstacle.z > game.player.z - 28) {
          nextObstacles.push(obstacle);
        }
      });
      game.obstacles = nextObstacles;

      game.obstacles.forEach((obstacle) => {
        const nearZ = Math.abs(obstacle.z - game.player.z) < obstacle.depth * 0.65;
        if (!nearZ) {
          return;
        }

        const nearX = Math.abs(obstacle.x - game.player.x) < obstacle.width * 0.5;
        const nearY = Math.abs(obstacle.y - game.player.y) < obstacle.height * 0.5;

        if (nearX && nearY) {
          game.stats.hits += 1;
          game.stats.score = Math.max(0, game.stats.score - 120);
          game.player.x = 0;
          game.player.y = 1.2;
          game.player.z += 14;
        }
      });

      setHud({
        score: Math.floor(game.stats.score),
        destroyed: game.stats.destroyed,
        hits: game.stats.hits,
      });
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const context = canvas.getContext('2d');
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const game = gameRef.current;
      const cameraZ = game.player.z - CAMERA_OFFSET_Z;
      const horizon = height * 0.45;

      const project = (x, y, z) => {
        const relativeZ = z - cameraZ;
        if (relativeZ <= 0.2) {
          return null;
        }
        const scale = 330 / relativeZ;
        return {
          x: width / 2 + x * scale,
          y: horizon - y * scale,
          scale,
        };
      };

      const skyGradient = context.createLinearGradient(0, 0, 0, horizon);
      skyGradient.addColorStop(0, '#091120');
      skyGradient.addColorStop(1, '#26507f');
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, width, horizon);

      const groundGradient = context.createLinearGradient(0, horizon, 0, height);
      groundGradient.addColorStop(0, '#2a663f');
      groundGradient.addColorStop(1, '#173825');
      context.fillStyle = groundGradient;
      context.fillRect(0, horizon, width, height - horizon);

      context.strokeStyle = 'rgba(255,255,255,0.2)';
      for (let i = 1; i <= 12; i += 1) {
        const lineZ = game.player.z + i * 8;
        const left = project(-11, 0, lineZ);
        const right = project(11, 0, lineZ);
        if (left && right) {
          context.beginPath();
          context.moveTo(left.x, left.y);
          context.lineTo(right.x, right.y);
          context.stroke();
        }
      }

      const drawPlane = () => {
        const plane = project(game.player.x, game.player.y, game.player.z + 3);
        if (!plane) {
          return;
        }

        const s = Math.max(18, 46 * plane.scale);
        context.fillStyle = '#f5f5f5';
        context.beginPath();
        context.moveTo(plane.x, plane.y - s * 0.8);
        context.lineTo(plane.x + s * 0.45, plane.y + s * 0.6);
        context.lineTo(plane.x, plane.y + s * 0.28);
        context.lineTo(plane.x - s * 0.45, plane.y + s * 0.6);
        context.closePath();
        context.fill();

        context.fillStyle = '#5bc0ff';
        context.fillRect(plane.x - s * 0.08, plane.y - s * 0.42, s * 0.16, s * 0.42);
        context.fillStyle = '#ff8f43';
        context.fillRect(plane.x - s * 0.08, plane.y + s * 0.25, s * 0.16, s * 0.24);
      };

      const drawObstacle = (obstacle) => {
        const p = project(obstacle.x, obstacle.y, obstacle.z);
        if (!p) {
          return;
        }

        const w = obstacle.width * p.scale;
        const h = obstacle.height * p.scale;

        if (obstacle.type === 'mountain') {
          context.fillStyle = '#67553f';
          context.beginPath();
          context.moveTo(p.x, p.y - h);
          context.lineTo(p.x + w * 0.5, p.y + h * 0.1);
          context.lineTo(p.x - w * 0.5, p.y + h * 0.1);
          context.closePath();
          context.fill();
          context.fillStyle = '#8a7456';
          context.beginPath();
          context.moveTo(p.x, p.y - h);
          context.lineTo(p.x - w * 0.2, p.y - h * 0.2);
          context.lineTo(p.x - w * 0.06, p.y - h * 0.25);
          context.closePath();
          context.fill();
          return;
        }

        context.fillStyle = '#d94848';
        context.fillRect(p.x - w * 0.4, p.y - h * 0.5, w * 0.8, h);
        context.fillStyle = '#ffca3a';
        context.fillRect(p.x - w * 0.08, p.y - h * 0.5, w * 0.16, h);
      };

      game.obstacles
        .slice()
        .sort((a, b) => b.z - a.z)
        .forEach(drawObstacle);

      game.bullets.forEach((bullet) => {
        const p = project(bullet.x, bullet.y, bullet.z);
        if (!p) {
          return;
        }
        const bulletSize = Math.max(2, p.scale * 0.45);
        context.fillStyle = '#fffa9f';
        context.fillRect(p.x - bulletSize * 0.5, p.y - bulletSize * 1.8, bulletSize, bulletSize * 2.4);
      });

      drawPlane();
    };

    const loop = (time) => {
      const delta = Math.min(2, (time - previousTime) / 16.67);
      previousTime = time;
      update(delta);
      draw();
      animationFrame = window.requestAnimationFrame(loop);
    };

    animationFrame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="game-page">
      <canvas className="game-canvas" ref={canvasRef} />
      <div className="hud">
        <h1>Sky Runner</h1>
        <p>Управление: ← → ↑ ↓ / WASD, стрельба: SPACE</p>
        <div className="hud-stats">
          <span>Счёт: {hud.score}</span>
          <span>Разбито: {hud.destroyed}</span>
          <span>Столкновений: {hud.hits}</span>
        </div>
        <p className="hint">Бесконечный полёт: облетай горы и расстреливай красные преграды.</p>
      </div>
    </div>
  );
}

export default App;
