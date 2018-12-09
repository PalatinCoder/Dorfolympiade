/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

class View404 extends PageViewElement {
  render() {
    return html`
      <section>
        <h2>Hoppla! Du hast einen 404 erwischt...</h2>
        <p>Die aufgerufene Seite existiert nicht. Gehe einmal über <a href="/">Los</a>!</p>
      </section>
    `
  }
}

window.customElements.define('view-404', View404);
