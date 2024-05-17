import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';

import { AgvInfo, WebPosition } from '@/pages/agv-main-controller/typings';
import { MainView } from '../MainView';


export class Agv extends Mesh {
    agvId: string;
    power: number = 1;
    agvInfo: AgvInfo;
    mainView : MainView;

    constructor(agvInfo : AgvInfo, mainView : MainView) {
        const rm = mainView.rmMap.get(agvInfo.rmKey);

        const length = rm?.length ? rm?.length / 1000 : 1;
        const width = rm?.width ? rm?.width / 1000 : 1;
        // create a geometry
        const geometry = new BoxGeometry(length, width, 0);
        // create a default (white) Basic material
        const material = new MeshBasicMaterial({color: 'skyblue'});
        // create a Mesh containing the geometry and material
        super(geometry, material);
        this.mainView = mainView;
        mainView.addObject(this);
        mainView.agvMap.set(agvInfo.agvId, this);

        this.agvId = agvInfo.agvId;
        this.agvInfo = agvInfo;
    }

    updateData(agvInfo: AgvInfo) {
        this.agvInfo = agvInfo;
        const position = agvInfo.position;
        this.position.set(position.x, position.y, position.z);
        this.rotation.set(0, 0, position.theta);
    }
}