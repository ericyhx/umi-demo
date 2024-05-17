import { Box3, OrthographicCamera, Vector3, WebGLRenderer } from 'three';

export class Resizer2D {
  divElement: HTMLDivElement;
  camera: OrthographicCamera; 
  renderer: WebGLRenderer;
  box?: Box3;

  constructor(divElement: HTMLDivElement, 
      camera: OrthographicCamera, 
      renderer: WebGLRenderer) {
      
      this.divElement = divElement;
      this.camera = camera;
      this.renderer = renderer;
  }

  // 将相机调整到地图中心位置，显示整个地图
  resize() {
      if (!this.box) {
          return;
      }
      
      const bottomLeft = this.box.min;
      const topRight = this.box.max;
      let width = (topRight.x - bottomLeft.x) * 1.1;
      let height = (topRight.y - bottomLeft.y) * 1.1;
      if (height === 0) {
          return;
      }
      const aspect = width / height;

      const canvasWidth = this.divElement.offsetWidth;
      const canvasHeight = window.innerHeight * 0.9;
      const canvasAspect = canvasWidth / canvasHeight;

      if (aspect > canvasAspect) {
          height = width / canvasAspect;
      } else {
          width = height * canvasAspect;
      }

      const center = this.box.getCenter(new Vector3());
      this.camera.left = width / -2 + center.x;
      this.camera.right = width / 2 + center.x;
      this.camera.top = height / 2 + center.y;
      this.camera.bottom = height / -2 + center.y;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(canvasWidth, canvasHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
  }
}
