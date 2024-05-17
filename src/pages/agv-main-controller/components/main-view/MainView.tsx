import { Component, createRef } from 'react';
import {
  Camera,
  Intersection,
  Object3D,
  Object3DEventMap,
  OrthographicCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { Loop, Updatable } from './three-obj/Loop';
import { Resizer2D } from './three-obj/Resizer2D';
import { createCamera2D } from './three-obj/camera2D';
import { Controls } from './three-obj/controls';
import { createRenderer } from './three-obj/renderer';
import { createScene } from './three-obj/scene';

import * as d3 from 'd3';
import debounce from 'lodash.throttle';
import _ from 'lodash';
import React from 'react';
import { Agv } from './device/Agv';
import { Point3DObj } from './three-obj/AgvMap';
import services from '@/services/ds';
import { loadMap } from './map/loadMap';
import { DsSocket } from '../../systems/RcsSocket';
import { PointDrawerState } from '../right-drawer/point/pointDrawer';

const { allRm } = 
  services.chexingpeizhi;
const { allMap } = 
  services.detupeizhi;

// 定义 Props 的类型
interface MainViewProps {
  reLocalization: boolean;
  setPointDrawerState: React.Dispatch<React.SetStateAction<PointDrawerState | undefined>>;
  setAgvState: React.Dispatch<React.SetStateAction<Agv | undefined>>;
  setReLocalization: React.Dispatch<React.SetStateAction<boolean>>;
}

export class MainView extends Component<MainViewProps> {
  refContainer: React.RefObject<HTMLDivElement>;
  resizeObserver: ResizeObserver;
  scene: Scene;
  points: Point3DObj[];
  rmMap: Map<String, API.RobotModelDTO>;
  agvMap: Map<string, Agv>;
  raycaster: Raycaster;
  renderer?: WebGLRenderer;
  controls?: Controls;
  resizer?: Resizer2D;
  camera2D?: Camera;
  loop?: Loop;

  constructor(props: MainViewProps) {
    super(props);
    this.refContainer = createRef<HTMLDivElement>();
    this.scene = createScene();
    this.raycaster = new Raycaster();
    this.points = [];
    this.agvMap = new Map();
    this.rmMap = new Map();

    // 指定在触发之后延迟500毫秒执行
    this.resizeObserver = new ResizeObserver(
        debounce((entries: ResizeObserverEntry[]) => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }
            this.resize();
        }, 500) 
    );
  }

  render() {
    return <div ref={this.refContainer}></div>;
  }

  // 初始化
  componentDidMount() {
    if (!this.refContainer.current) {
      return;
    }
    const divElement = this.refContainer.current;

    this.camera2D = createCamera2D(window.innerWidth, window.innerHeight);
    this.renderer = createRenderer();
    this.resizer = new Resizer2D(
      divElement,
      this.camera2D as OrthographicCamera,
      this.renderer,
    );
    this.loop = new Loop(this.camera2D, this.scene, this.renderer);
    this.controls = new Controls(this.camera2D, this.renderer.domElement);
    divElement.appendChild(this.renderer.domElement);

    this.addUpdatable(this.controls);
    // 监听窗口大小变化
    this.resizeObserver.observe(divElement);
    // 监听点击事件
    this.addClickListhener(this.renderer);
    this.init();
  }

  componentWillUnmount(): void {
    if (this.refContainer.current) {
      this.resizeObserver.unobserve(this.refContainer.current);
    }
  }

  componentDidUpdate(prevProps: MainViewProps) {
    // 重定位地图
    if (this.props.reLocalization !== prevProps.reLocalization) {
        reloc(this.props, this.controls);
    }
    // // 更新元素的visible
    // if (this.props.selectedElements !== prevProps.selectedElements) {
    //     showElements(this, this.props.selectedElements);
    // }
}

  addUpdatable(...object: Updatable[]) {
    this.loop?.updatables.push(...object);
  }

  async init() {
    await this.initRobotModel();
    await this.initMap();
    
    this.start();
    this.resize();
    new DsSocket(this);
  }

  async initRobotModel() {
    const rmSet : API.ResultListRobotModelDTO = await allRm();
    rmSet.data?.forEach((rm : API.RobotModelDTO) => {
      if (rm.key) {
        this.rmMap.set(rm.key, rm);
      }
    });
  }

  async initMap() {
    const result : API.ResultListMapDataDTO = await allMap();
    const agvMap =  loadMap(result);

    // 加载edge
    agvMap.edgeMap.forEach((edge) => {
        this.addObject(edge);
    });
    // 加载point
    agvMap.pointMap.forEach((point) => {
      this.points.push(point);
      this.addObject(point);
    });

    if (this.resizer) {
      this.resizer.box = agvMap.boundingBox;
    }
  }

  addObject(...object: Object3D<Object3DEventMap>[]) {
    this.scene.add(...object);
  }

  resize() {
    this.resizer?.resize();
    this.controls?.reset();
  }

  start() {
    this.loop?.start();
  }

  addClickListhener(renderer: WebGLRenderer) {
    const view = d3.select(renderer.domElement);
    view.on("click", (event: MouseEvent) => {
        this.onMouseClick(event, this.camera2D);
    });
  }

  onMouseClick(event: MouseEvent, camera?: Camera) {
    if (!camera) {
        return;
    }

    const objects = [...this.points, ...this.agvMap.values()];
    const intersect = this.checkIntersects(event, camera, objects);
    if (intersect) {
        if (intersect.object instanceof Point3DObj) {
            this.showPointModal(intersect.object as Point3DObj);
        } else if (intersect.object instanceof Agv) {
            this.showAgvDrawer(intersect.object as Agv);
        }
    }
  }

  checkIntersects(
    event: MouseEvent, 
    camera: Camera, 
    object3: Object3D<Object3DEventMap>[]
  ): Intersection<Object3D<Object3DEventMap>> | undefined {

    const mousePosition = this.toMapPosition(event);
    if (!mousePosition) {
        return;
    }

    this.raycaster.setFromCamera(mousePosition, camera);
    const intersects = this.raycaster.intersectObjects(object3);
    if (intersects[0]) {
        const sorted_intersects = this.sortIntersectsByDistanceToRay(intersects);
        return sorted_intersects[0];
    } 
  }

  toMapPosition(event: MouseEvent): Vector2 | undefined {
    if (!this.renderer) {
        return;
    }
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    const size = this.renderer.getSize(new Vector2());
    return new Vector2(mouseX / size.x * 2 - 1, - mouseY / size.y * 2 + 1);
  }

  sortIntersectsByDistanceToRay(intersects: Intersection<Object3D<Object3DEventMap>>[]) {
    return _.sortBy(intersects, "distanceToRay");
  }

  showPointModal(point3DObj: Point3DObj) {
    const point = point3DObj.point;
    this.props.setPointDrawerState({display: true, pointId: point.id, pointType: point.type})
  }  

  showAgvDrawer(agv: Agv) {
    this.props.setAgvState(agv);
    console.log(agv);
  }
}

// 重定位地图
function reloc(props: MainViewProps, controls?: Controls): void {
  if (props.reLocalization && controls) {
      controls.reset();
  }
  // 重置触发状态
  props.setReLocalization(false);
}
