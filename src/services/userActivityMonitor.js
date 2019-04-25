import throttle from 'lodash/throttle';
import { idleActions } from 'ducks/idle';
import store from 'src/store';

const ACTIVITY_EVENTS = [
  'mousemove',
  'keydown',
  'wheel',
  'DOMMouseScroll',
  'mouseWheel',
  'mousedown',
  'touchstart',
  'touchmove'
];

const ACTIVITY_DELAY = 1000;

class UserActivityMonitor {
  init() {
    const fn = throttle(() => {
      store.dispatch(idleActions.updateActivity());
    }, ACTIVITY_DELAY);
    ACTIVITY_EVENTS.forEach(x => document.addEventListener(x, fn));
  }
}

export default new UserActivityMonitor();
