import { Space, Button, Drawer, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';


interface GlobalSettingDrawerProbs {
    open: boolean;
    onClose: any;
}


export const GlobalSettingDrawer: React.FC<GlobalSettingDrawerProbs> = ({
    open,
    onClose,
}) => {
    return (
        <Drawer
            title="全局控制"
            placement="right"
            mask={false}
            closable={false}
            open={open}
            onClose={onClose}
            style={{ zIndex: 100 }}
            extra={
                <Space>
                  <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
                </Space>
            }
        >
            <p>test</p>
        </Drawer>
    );
};