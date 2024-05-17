import { FloatButton } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';


interface Probs {
    showGlobalDrawer: any
}

export const GlobalSettingFloatButton: React.FC<Probs> = ({ showGlobalDrawer }) => {
    
  return (
    <FloatButton
        style={{ position: 'fixed', top: 30, right: 10 }}
        icon={<ArrowLeftOutlined />}
        onClick={showGlobalDrawer}
    />
  );
};