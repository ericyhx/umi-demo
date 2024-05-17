import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Updatable } from './Loop';

export class Controls extends OrbitControls implements Updatable {
  constructor(camera: Camera, canvas: HTMLCanvasElement) {
    super(camera, canvas);
    this.enableRotate = false;
  }

  tick(): void {
    this.update();
  }
}
