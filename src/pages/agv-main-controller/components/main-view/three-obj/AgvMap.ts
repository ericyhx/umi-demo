import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js';

import {
    Box3,
    Mesh,
    Vector4,
    BoxGeometry,
    TubeGeometry,
    BufferGeometry,
    Line,
    LineBasicMaterial,
    MeshBasicMaterial,
    Curve,
    Vector3,
} from 'three';
import { Point } from '../map/BasicMapElements';


export class AgvMap {
    boundingBox = new Box3();
    pointMap: Map<string, Point3DObj> = new Map();
    edgeMap: Map<string, NurbsLine3DObj> = new Map();

    getPointById(id: string): Point | undefined {
        return this.pointMap.get(id)?.point;
    }

    getCurveById(id: string): NURBSCurve | undefined {
        return this.edgeMap.get(id)?.curve;
    }
}

export class Point3DObj extends Mesh {
    point: Point;

    constructor(point: Point) {
        // create a geometry
        const geometry = new BoxGeometry(0.1, 0.1, 0);
        // create a default (white) Basic material
        const material = new MeshBasicMaterial({ color: "grey" });
        // create a Mesh containing the geometry and material
        super(geometry, material);
        this.position.set(point.x, point.y, point.z);
        this.point = point;
    }
}

export class NurbsLine3DObj extends Line {
    curve: NURBSCurve;

    constructor(degree: number, nurbsKnots: number[], controlPoints: Vector4[]) {
        const curve = new NURBSCurve(degree, nurbsKnots, controlPoints);
        const nurbsGeometry = new BufferGeometry();
        nurbsGeometry.setFromPoints(curve.getPoints(200));

        const nurbsMaterial = new LineBasicMaterial({color: "grey"});
        super(nurbsGeometry, nurbsMaterial);
        this.curve = curve;
    }
}

export class Tube3DObj extends Mesh {

    constructor(path: Curve<Vector3>) {
        const tubeGeometry = new TubeGeometry(path, 30, 0.02, 3, false);
        const material = new MeshBasicMaterial({color: "skyblue", opacity: 0.7, transparent: true});
        super(tubeGeometry, material);
    }
}