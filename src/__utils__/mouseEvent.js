import { fireEvent } from 'react-testing-library';

const mouseDown = el => {
  fireEvent(
    el,
    new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    })
  );
};

const mouseEnter = el => {
  fireEvent(
    el,
    new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: false
    })
  );
};

const mouseLeave = el => {
  fireEvent(
    el,
    new MouseEvent('mouseleave', {
      bubbles: true,
      cancelable: false
    })
  );
};

export default { mouseDown, mouseEnter, mouseLeave };
