
export type AgvInfo = {
    agvId: string;
    rmKey: string;
    position: WebPosition;
    steps: WebStep[];
    distanceSinceLastNode: number;
}

type WebPosition = {
    // 单位均为m
    x: number;
    y: number;
    z: number;
    // 弧度
    theta: number;
}

export type WebStep = {
    
}