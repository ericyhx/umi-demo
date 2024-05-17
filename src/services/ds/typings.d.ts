declare namespace API {
  type addAgvParams = {
    mapNo: string;
    rmKey: string;
  };

  type ControlPoint = {
    x?: number;
    y?: number;
    weight?: number;
  };

  type deleteMapParams = {
    id: number;
  };

  type deleteRmParams = {
    id: number;
  };

  type disableRmParams = {
    rmKey: string;
  };

  type EdgeDTO = {
    id?: string;
    start?: PointDTO;
    end?: PointDTO;
    controlPoints?: ControlPoint[];
    knotVector?: number[];
    degree?: number;
  };

  type enableRmParams = {
    rmKey: string;
  };

  type MapConfigDTO = {
    mapFile?: string;
    mapNo?: string;
    rmKeys?: string[];
    mapType?: 'GENSONG' | 'HAIROU' | 'YIWU';
  };

  type MapDataDTO = {
    mapNo?: string;
    rmKey?: string;
    pointMap?: PointDTO[];
    edgeMap?: EdgeDTO[];
  };

  type PointDTO = {
    id?: string;
    x?: number;
    y?: number;
    z?: number;
    type?: 'ROAD' | 'STORAGE' | 'CHARGER' | 'STATION';
  };

  type ResultListMapConfigDTO = {
    code?: number;
    message?: string;
    data?: MapConfigDTO[];
  };

  type ResultListMapDataDTO = {
    code?: number;
    message?: string;
    data?: MapDataDTO[];
  };

  type ResultListRobotModelDTO = {
    code?: number;
    message?: string;
    data?: RobotModelDTO[];
  };

  type ResultVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
  };

  type RobotModelDTO = {
    key?: string;
    company?: 'GENSONG' | 'HAIROU';
    deviceType?: 'KIVA' | 'FORKLIFT';
    length?: number;
    width?: number;
  };
}
