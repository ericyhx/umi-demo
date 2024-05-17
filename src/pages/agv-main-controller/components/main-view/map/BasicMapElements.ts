
export const enum PointType {
    ROAD = "ROAD",
    STATION = "STATION",
    STORAGE = "STORAGE",
    CHARGER = "CHARGER",
}

export function toPointType(value: string | undefined): PointType {
    if (value === "STATION") return PointType.STATION;
    if (value === "STORAGE") return PointType.STORAGE;
    if (value === "CHARGER") return PointType.CHARGER;
    return PointType.ROAD;
}
  

export class Point {
    id: string;
    x: number;
    y: number;
    z: number;
    type: PointType;

    constructor(x: number, y: number, z: number, type: PointType = PointType.ROAD, id?: string) {
        if (id) {
            this.id = id;
        } else {
            this.id = x + "_" + y;
        }
        this.x = x;
        this.y = y;
        this.z = z;
        this.type = type;
    }

    toString() {
        return "{id: " + this.id 
            + ", x: " + this.x 
            + ", y: " + this.y
            + ", z: " + this.z
            + ", type: " + this.type
            + "}";
    }
}

export interface ControlPoint extends Point {
    weight: number;
}

export interface Edge {
    s: Point
    e: Point
}

export interface Trajectory {
    controlPoints: ControlPoint[]; 
    degree: number; 
    knotVector: number[]; 
}

export interface NurbsEdge extends Edge {
    trajectory: Trajectory;
}

export class Position {
    point: Point;
    radian: number;

    constructor(x: number, y: number, z: number, radian: number) {
        this.point = new Point(x, y, z);
        this.radian = radian;
    }

    toString() {
        return "{" 
            + "point: " + this.point.toString()
            + ", radian: " + this.radian
            + "}"
    }
}