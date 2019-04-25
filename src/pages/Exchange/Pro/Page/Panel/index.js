import React from 'react';

import OpenPositions from 'pages/Exchange/Pro/Page/OpenPositions';
import { ACTIVE_MENU_ITEM } from 'pages/Exchange/Pro/Page/constants/activeMenuItem';

import { PanelWrapper, Content } from './styled';
import { propTypes } from './props';

const Panel = ({ activeMenuItem }) => (
  <PanelWrapper hidden={activeMenuItem === ACTIVE_MENU_ITEM.NONE}>
    <Content>
      {activeMenuItem === ACTIVE_MENU_ITEM.OPEN_POSITIONS && <OpenPositions />}
      {activeMenuItem === ACTIVE_MENU_ITEM.SETTINGS && (
        <div>Settings panel will be here</div>
      )}
    </Content>
  </PanelWrapper>
);

Panel.propTypes = propTypes;

export default Panel;
