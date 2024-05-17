import { Vector4 } from 'three';

import {
    Edge,
    NurbsEdge,
    Point,
    PointType,
    toPointType,
} from './BasicMapElements';
import { AgvMap, NurbsLine3DObj, Point3DObj } from '../three-obj/AgvMap';


export function loadMap(result : API.ResultListMapDataDTO): AgvMap {
    const agvMap = new AgvMap();

    result.data?.forEach((mapDataDTO : API.MapDataDTO) => {
      loadEdges(mapDataDTO.edgeMap, agvMap);
      loadPoints(mapDataDTO.pointMap, agvMap);
    })
    return agvMap;
}

export function loadPoints(pointMap: API.PointDTO[] | undefined, map: AgvMap) {
    pointMap?.forEach((pointJson: API.PointDTO) => {
      const x = pointJson.x ? pointJson.x : 0;
      const y = pointJson.y ? pointJson.y : 0;
      const z = pointJson.z ? pointJson.z : 0;
      const type = 'type' in pointJson ? toPointType(pointJson.type) : PointType.ROAD;
      const point = new Point(x / 1000, y / 1000, z / 1000, type, pointJson.id);
      const point3DObj = new Point3DObj(point);
      map.pointMap.set(point.id, point3DObj);
      map.boundingBox.expandByObject(point3DObj);
    });
}

export function loadEdges(edgeMap : API.EdgeDTO[] | undefined, map: AgvMap) {
    edgeMap?.forEach((edge: API.EdgeDTO) => {
        let line: NurbsLine3DObj;
        if (edge.knotVector) {
            line = genNurbsEdge(edge);
        } else {
            line = genLineEdge(edge);
        }

        const id = edge.id ? edge.id : "";
        map.edgeMap.set(id, line);
        map.boundingBox.expandByObject(line);
    });
}

function genNurbsEdge(edge: API.EdgeDTO) {
    const nurbsControlPoints: Vector4[] = [];
    edge.controlPoints?.forEach( (controlPoint) => {
        const x = controlPoint.x ? controlPoint.x : 0;
        const y = controlPoint.y ? controlPoint.y : 0;
        nurbsControlPoints.push(new Vector4(x / 1000, y / 1000, 0, controlPoint.weight))
    });

    const degree = edge.degree ? edge.degree : 0;
    const knotVector = edge.knotVector ? edge.knotVector : [];
    return new NurbsLine3DObj(degree, knotVector, nurbsControlPoints)
}

function genLineEdge(edge: API.EdgeDTO) {
    const nurbsControlPoints = [];

    const startX = edge.start?.x ? edge.start?.x : 0;
    const startY = edge.start?.y ? edge.start?.y : 0;
    const endX = edge.end?.x ? edge.end?.x : 0;
    const endY = edge.end?.y ? edge.end?.y : 0;
    nurbsControlPoints.push(new Vector4(startX / 1000, startY / 1000, 0, 1))
    nurbsControlPoints.push(new Vector4(endX / 1000, endY / 1000, 0, 1))

    return new NurbsLine3DObj(1, [0, 0, 1, 1], nurbsControlPoints);
}

