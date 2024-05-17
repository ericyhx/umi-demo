import { FloatButton } from 'antd';

import { AimOutlined } from '@ant-design/icons';

interface FooterButtonGroupProbs {
    reloc: () => void;
}

export const FooterButtonGroup: React.FC<FooterButtonGroupProbs> = ({ 
    reloc 
}) => {


    
    return (
        <>
            <FloatButton 
                    icon={<AimOutlined />}
                    onClick={reloc} />
        </>
    );
};