/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from './store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from './actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './components/snack-bar.js';
import { Icon } from '@material/mwc-icon'
import { Ripple } from "@material/mwc-ripple";

class App extends connect(store)(LitElement) {
  render() {
    const {appTitle, _page, _drawerOpened, _drawerPersistent, _snackbarOpened, _offline} = this;
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
      :host {
        --palette-primary: #3f51b5;
        --palette-dark-primary: #303f9f;
        --palette-light-primary: #c5cae9;
        --palette-secondary: #ff5252;
        --palette-on-primary: #fff;
        --palette-on-secondary: #fff;
        --palette-text-primary: #212121;
        --palette-text-secondary: #757575;
        --palette-divider: #bdbdbd;
        --palette-surface: #fff;
        --palette-on-surface: #000;

        --app-drawer-width: 256px;
        display: block;
      }

      @media (min-width: 768px) {
        :host {
          --app-drawer-width: 384px;
        }
      }
      @media (min-width: 1440px) {
        /* large screen -> drawer is persistent, so we need some margin on the left to keep the content centered */
        main { margin-left: var(--app-drawer-width); }
        [main-title] { padding-left: var(--app-drawer-width); }
        app-drawer { border-right: 1px solid var(--palette-divider); }
      }

      app-header {
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--palette-primary);
        color: var(--palette-on-primary);
        border-bottom: 1px solid #eee;
      }

      app-drawer {
        z-index: 1;
      }

      [main-title] {
        font-size: 26px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .menu-btn {
        background: none;
        border: none;
        color: var(--palette-on-primary);
        cursor: pointer;
        height: 44px;
        width: 44px;
        outline: none;
        -webkit-tap-highlight-color: transparent;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-top: calc(var(--app-drawer-width) / 16 * 9 + 24px);
        background-color: var(--palette-surface);
        background-image: url(images/drawer-header.jpg);
        background-repeat: no-repeat;
        background-position: center top;
        background-size: contain;
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        outline: none;
        color: var(--palette-on-surface);
        line-height: 48px;
        padding: 0 16px;
      }

      .drawer-list > a::before {
        font-family: "Material Icons";
        font-size: 24px;
        line-height: 1;
        vertical-align: text-bottom;
        color: var(--palette-text-secondary);
        margin-right: 16px;
      }
      .drawer-list > a[href="/station"]::before { content: 'fitness_center'; }
      .drawer-list > a[href="/deviceinfo"]::before { content: 'perm_device_information'; }

      .drawer-list > a[selected] {
        color: var(--palette-primary);
        background: var(--palette-light-primary);
      }

      .drawer-list > a[selected]::before {
        color: inherit;
      }
      .drawer-list mwc-ripple {
        --mdc-theme-primary: var(--palette-primary);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        position: relative;
        padding: 16px;
        padding-top: 64px;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" @click="${() => store.dispatch(updateDrawerState({opened: true}))}"><mwc-icon>menu</mwc-icon><mwc-ripple unbounded></mwc-ripple></button>
        <div main-title>${appTitle}</div>
      </app-toolbar>
    </app-header>

    <!-- Drawer content -->
    <app-drawer 
        swipe-open    
        .opened="${_drawerPersistent ? true: _drawerOpened /* persistent drawer is always open*/}" .persistent="${_drawerPersistent}"
        @opened-changed="${e => store.dispatch(updateDrawerState({opened: e.target.opened}))}">
      <nav class="drawer-list">
        <a ?selected="${_page === 'station'}" href="/station">Station<mwc-ripple primary></mwc-ripple></a>
        <a ?selected="${_page === 'deviceinfo'}" href="/deviceinfo">Info<mwc-ripple primary></mwc-ripple></a>
      </nav>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <station-view class="page" ?active="${_page === 'station'}"></station-view>
      <deviceinfo-view class="page" ?active="${_page === 'deviceinfo'}"></deviceinfo-view>
      <view-404 class="page" ?active="${_page === '404'}"></view-404>
    </main>

    <snack-bar ?active="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _drawerPersistent: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 1440px)`,
    /* persist the drawer if the query matches */
    (matches) => store.dispatch(updateDrawerState({persistent: matches})));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
    this._drawerPersistent = state.app.drawerPersistent;
  }
}

window.customElements.define('dorfolympiade-app', App);
