// Custom canvas-based particle system for rose gold, gold, and pink confetti and hearts.
// This is written from scratch to avoid external dependencies and text emojis.

class Particle {
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.type = type; // 'confetti' or 'heart'
    this.color = color;
    
    // Size settings
    if (this.type === 'heart') {
      this.size = Math.random() * 12 + 10; // 10 to 22px
    } else {
      this.width = Math.random() * 8 + 6;
      this.height = Math.random() * 12 + 8;
      this.size = Math.max(this.width, this.height);
    }

    // Motion settings
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + (this.type === 'heart' ? 2 : 4);
    
    this.vx = Math.cos(angle) * speed;
    this.vy = -Math.abs(Math.sin(angle) * speed) - (this.type === 'heart' ? 2 : 1); // upwards focus
    
    this.gravity = this.type === 'heart' ? -0.02 : 0.15; // Hearts float upwards, confetti falls down
    this.drag = 0.98;
    this.opacity = 1;
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
    
    // Rotation for confetti
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    this.wobble = Math.random() * Math.PI;
    this.wobbleSpeed = Math.random() * 0.05 + 0.02;
  }

  update() {
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.vy += this.gravity;
    
    this.x += this.vx;
    this.y += this.vy;
    
    // Add a bit of horizontal sway / wind
    if (this.type === 'heart') {
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.5;
    } else {
      this.rotation += this.rotationSpeed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.cos(this.wobble) * 0.3;
    }

    this.opacity -= this.fadeSpeed;
    return this.opacity > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    if (this.type === 'heart') {
      // Draw vector heart
      const size = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - size / 4);
      // Top-left lobe
      ctx.bezierCurveTo(
        this.x - size / 2, this.y - size,
        this.x - size, this.y - size / 3,
        this.x, this.y + size * 0.8
      );
      // Top-right lobe
      ctx.bezierCurveTo(
        this.x + size, this.y - size / 3,
        this.x + size / 2, this.y - size,
        this.x, this.y - size / 4
      );
      ctx.closePath();
      ctx.fill();
    } else {
      // Draw rotating confetti piece
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      // Wobble width to simulate 3D rotation
      const scaleX = Math.sin(this.wobble);
      ctx.scale(scaleX, 1);
      
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
    ctx.restore();
  }
}

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    
    // Color palettes
    this.colors = {
      gold: ['#D4AF37', '#F3E5AB', '#AA7C11', '#FFDF00'],
      roseGold: ['#B76E79', '#E0A899', '#C39B9B', '#F3A8A8'],
      pink: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FFE4E1'],
      cream: ['#FFF8DC', '#FFFDD0', '#FAF0E6']
    };
    
    this.allColors = [
      ...this.colors.gold,
      ...this.colors.roseGold,
      ...this.colors.pink,
      ...this.colors.cream
    ];
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, type = 'confetti', count = 30) {
    for (let i = 0; i < count; i++) {
      const color = this.allColors[Math.floor(Math.random() * this.allColors.length)];
      this.particles.push(new Particle(x, y, type, color));
    }
  }

  burstMix(x, y, count = 40) {
    const confettiCount = Math.floor(count * 0.6);
    const heartCount = count - confettiCount;
    
    for (let i = 0; i < confettiCount; i++) {
      const color = this.allColors[Math.floor(Math.random() * this.allColors.length)];
      this.particles.push(new Particle(x, y, 'confetti', color));
    }
    for (let i = 0; i < heartCount; i++) {
      // Hearts should be mostly shades of pink/rose-gold
      const heartColors = [...this.colors.roseGold, ...this.colors.pink];
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.particles.push(new Particle(x, y, 'heart', color));
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles = this.particles.filter(p => {
      const keep = p.update();
      if (keep) p.draw(this.ctx);
      return keep;
    });

    if (this.active || this.particles.length > 0) {
      requestAnimationFrame(() => this.tick());
    }
  }

  start() {
    if (!this.active) {
      this.active = true;
      this.resize();
      this.tick();
    }
  }

  stop() {
    this.active = false;
  }
}
