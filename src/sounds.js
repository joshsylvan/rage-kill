export class SoundManager {
  constructor() {
    this.sounds = {};
    this.files = {};
  }

  playSound(name) {
    this.sounds[name].play();
  }

  playEffect(name) {
    const effect = new Audio(`./resources/sounds/${this.files[name]}`);
    effect.play();
  }

  addSound(fileName, name) {
    this.files[name] = fileName;
    this.sounds[name] = new Audio(`./resources/sounds/${fileName}`);
  }

  getSound(name) {
    return this.sounds[name];
  }

  addSounds(sounds) {
    sounds.forEach(([fileName, name]) => this.addSound(fileName, name));
  }

  stopSound(name) {
    this.sounds[name].pause();
    this.sounds[name].currentTime = 0;
  }

  stopAllSounds() {
    Object.keys(this.sounds).forEach(key => {
      this.stopSound(key);
    })
  }
}