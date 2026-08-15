// Web Audio API Synthesizer for Music Box Melody and Sound Effects
// Hand-crafted to sound like a vintage wind-up metal cylinder music box.

const NOTES = {
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00
};

const happyBirthday = [
  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'A4', duration: 1 },
  { note: 'G4', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'B4', duration: 2 },
  
  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'A4', duration: 1 },
  { note: 'G4', duration: 1 },
  { note: 'D5', duration: 1 },
  { note: 'C5', duration: 2 },
  
  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'G5', duration: 1 },
  { note: 'E5', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'B4', duration: 1 },
  { note: 'A4', duration: 2 },
  
  { note: 'F5', duration: 0.75 },
  { note: 'F5', duration: 0.25 },
  { note: 'E5', duration: 1 },
  { note: 'C5', duration: 1 },
  { note: 'D5', duration: 1 },
  { note: 'C5', duration: 2 }
];

function playChime(ctx, freq, time, duration) {
  // Main chime tone (triangle)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, time);
  
  // High metallic chime overtone (sine) - simulates the resonance of the metal tine
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2, time); // 1 octave higher
  
  // Subtler third harmonic for bell-like tone
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * 3.01, time); // slightly off-integer for metallic flavor
  
  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);
  
  const dest = ctx.destination;
  gain1.connect(dest);
  gain2.connect(dest);
  gain3.connect(dest);
  
  const attack = 0.005;
  const decay = 0.15;
  const release = Math.max(1.2, duration * 2.2);
  const sustain = 0.25;
  
  // Volume envelopes
  // Triangle (base note)
  gain1.gain.setValueAtTime(0, time);
  gain1.gain.linearRampToValueAtTime(0.2, time + attack);
  gain1.gain.exponentialRampToValueAtTime(0.2 * sustain, time + attack + decay);
  gain1.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay + release);
  
  // High overtone (initial strike/plink)
  gain2.gain.setValueAtTime(0, time);
  gain2.gain.linearRampToValueAtTime(0.12, time + attack);
  gain2.gain.exponentialRampToValueAtTime(0.0001, time + attack + 0.15); 
  
  // Third overtone (resonance)
  gain3.gain.setValueAtTime(0, time);
  gain3.gain.linearRampToValueAtTime(0.05, time + attack);
  gain3.gain.exponentialRampToValueAtTime(0.0001, time + attack + 0.08); 
  
  osc1.start(time);
  osc2.start(time);
  osc3.start(time);
  
  osc1.stop(time + attack + decay + release + 0.1);
  osc2.stop(time + attack + 0.2);
  osc3.stop(time + attack + 0.1);
}

export class MusicBox {
  constructor() {
    this.ctx = null;
    this.tempo = 90; // BPM
    this.currentNoteIndex = 0;
    this.nextNoteTime = 0;
    this.timerId = null;
    this.isPlaying = false;
  }
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  
  play(onNoteCallback) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    this.scheduler(onNoteCallback);
  }
  
  scheduler(onNoteCallback) {
    while (this.nextNoteTime < this.ctx.currentTime + 0.15) {
      this.scheduleNote(this.currentNoteIndex, this.nextNoteTime, onNoteCallback);
      this.advanceNote();
    }
    this.timerId = setTimeout(() => this.scheduler(onNoteCallback), 45);
  }
  
  advanceNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    const duration = happyBirthday[this.currentNoteIndex].duration;
    this.nextNoteTime += duration * secondsPerBeat;
    this.currentNoteIndex = (this.currentNoteIndex + 1) % happyBirthday.length;
  }
  
  scheduleNote(index, time, onNoteCallback) {
    const item = happyBirthday[index];
    const freq = NOTES[item.note];
    if (!freq) return;
    
    if (onNoteCallback) {
      const timeMs = (time - this.ctx.currentTime) * 1000;
      setTimeout(() => {
        if (this.isPlaying) onNoteCallback(item.note);
      }, Math.max(0, timeMs));
    }
    
    playChime(this.ctx, freq, time, item.duration * (60.0 / this.tempo));
  }
  
  stop() {
    this.isPlaying = false;
    clearTimeout(this.timerId);
    this.currentNoteIndex = 0;
  }
}

export function playPopSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.09);
}

export function playBlowSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // Low pitch triangle sweep for puff sound
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.2);
  
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.21);
}
