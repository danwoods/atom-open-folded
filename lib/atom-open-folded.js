'use babel';

import AtomOpenFoldedView from './atom-open-folded-view';
import { CompositeDisposable } from 'atom';

export default {

  atomOpenFoldedView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomOpenFoldedView = new AtomOpenFoldedView(state.atomOpenFoldedViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomOpenFoldedView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-open-folded:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomOpenFoldedView.destroy();
  },

  serialize() {
    return {
      atomOpenFoldedViewState: this.atomOpenFoldedView.serialize()
    };
  },

  toggle() {
    console.log('AtomOpenFolded was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
