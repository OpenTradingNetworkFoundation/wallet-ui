import Clipboard from 'clipboard';

export default class ClipboardSaver {
  constructor(text, event) {
    this._clipboard = new Clipboard('.null', {
      text: () => text
    });
    this._event = event;
  }

  copy() {
    this._clipboard.onClick(this._event);
  }
}
