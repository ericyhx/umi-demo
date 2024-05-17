import { OrthographicCamera } from 'three';

function createCamera2D (width: number, height: number) {
  const camera = new OrthographicCamera(
    width / -200,
    width / 200,
    height / 200,
    height / -200,
    1,
    1000,
  );
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
}

export { createCamera2D };
