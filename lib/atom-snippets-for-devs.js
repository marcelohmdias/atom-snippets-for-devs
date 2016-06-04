'use babel';

import AtomSnippetsForDevsView from './atom-snippets-for-devs-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSnippetsForDevsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSnippetsForDevsView = new AtomSnippetsForDevsView(state.atomSnippetsForDevsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSnippetsForDevsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-snippets-for-devs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSnippetsForDevsView.destroy();
  },

  serialize() {
    return {
      atomSnippetsForDevsViewState: this.atomSnippetsForDevsView.serialize()
    };
  },

  toggle() {
    console.log('AtomSnippetsForDevs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
