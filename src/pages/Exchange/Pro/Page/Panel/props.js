import PropTypes from 'prop-types';
import { ACTIVE_MENU_ITEM } from 'pages/Exchange/Pro/Page/constants/activeMenuItem';

export const propTypes = {
  activeMenuItem: PropTypes.oneOf([
    ACTIVE_MENU_ITEM.OPEN_POSITIONS,
    ACTIVE_MENU_ITEM.SETTINGS,
    ACTIVE_MENU_ITEM.NONE
  ])
};
