import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { MainView } from './components/main-view/MainView';
import { Agv } from './components/main-view/device/Agv';
import { GlobalSettingDrawer } from './components/right-drawer/global/globalSettingDrawer';
import { GlobalSettingFloatButton } from './components/right-drawer/global/globalSettingFloatButton';
import { PointDrawer, PointDrawerState } from './components/right-drawer/point/pointDrawer';
import { FooterButtonGroup } from './components/assistants/footerButtonGroup';

export const AgvMainController: React.FC = () => {
  const [openGlobalSetting, setOpenGlobalSetting] = useState(false);
  const [reLocalization, setReLocalization] = useState(false);
  const [agvState, setAgvState] = useState<Agv>();
  const [pointDrawerState, setPointDrawerState] = useState<PointDrawerState>();

  return (
    <PageContainer ghost>
      <MainView 
        reLocalization={reLocalization}
        setAgvState={setAgvState} 
        setPointDrawerState={setPointDrawerState}
        setReLocalization={setReLocalization}/>

      <GlobalSettingDrawer 
        open={openGlobalSetting}
        onClose={() => setOpenGlobalSetting(false)} />
      <GlobalSettingFloatButton 
        showGlobalDrawer={() => setOpenGlobalSetting(true)} />

      <PointDrawer 
        pointModalState={pointDrawerState}
        onClose={() => setPointDrawerState(undefined)} />

      <FooterButtonGroup 
        reloc={() => setReLocalization(true)} />
    </PageContainer>
  );
};

export default AgvMainController;
