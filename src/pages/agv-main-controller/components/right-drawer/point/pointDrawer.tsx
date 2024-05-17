import { Space, Button, Drawer, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { PointType } from '../../main-view/map/BasicMapElements';


export type PointDrawerState = {
    display: boolean;
    pointType?: PointType;
    pointId?: string;
}

interface PointDrawerProbs {
    pointModalState?: PointDrawerState;
    onClose: any;
}


export const PointDrawer: React.FC<PointDrawerProbs> = ({
    pointModalState, 
    onClose,
}) => {
    return (
        <Drawer
            title="Point"
            placement="right"
            mask={false}
            closable={false}
            open={pointModalState?.display}
            onClose={onClose}
            style={{ zIndex: 100 }}
            extra={
                <Space>
                  <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
                </Space>
            }
        >
            <p>id: {pointModalState?.pointId} </p>
            <p>type: {pointModalState?.pointType}</p>
        </Drawer>
    );
};