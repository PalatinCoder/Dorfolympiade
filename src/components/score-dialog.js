import { LitElement, html, css } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../store";
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-input/paper-input.js';
import { Ripple } from "@material/mwc-ripple";
import { addScore } from "../actions/scores";

class ScoreDialog extends connect(store)(LitElement) {
    static get styles() {
        return css`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            min-height: 100vh;
            height: 100%;
            width: 100%;
            background: var(--palette-surface);
            color: var(--palette-on-surface);
            visibility: hidden;
        }
        :host([active]) {
            visibility: visible;
        }
        app-toolbar {
            z-index: 1;
            width: calc(100% - 32px);
            height: 64px;
            padding: 0 16px;
            text-align: center;
            border-bottom: 1px solid #eee;
            display: flex;
            background-color: var(--palette-primary);
            color: var(--palette-on-primary);
            justify-content: space-between;
            opacity: 0;
            transition: opacity 0.1s ease-out;
        }
        :host([active]) app-toolbar {
            opacity: 1;
        }
        app-toolbar button {
            background: none;
            border: none;
            color: var(--palette-on-primary);
            cursor: pointer;
            height: 44px;
            width: 44px;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            transform: rotate(0deg);
            transition: transform 0.2s ease-out;
        }
        :host([active]) app-toolbar button:first-child {
            transform: rotate(180deg);
        }
        app-toolbar span {
            font-size: 26px;
        }

        main {
            padding: 16px;
            transform: scale(0);
            transform-origin: 90% 90%;
            transition: transform 0.1s ease-out;
        }
        :host([active]) main {
            transform: scale(1);
        }
        paper-slider {
            margin-left: -16px;
            flex-grow: 1;
        }
        .slider-container {
            display: flex;
            align-items: center;
        }
        .slider-container label {
            margin-left: 4px;
        }

        main > div { color: #00000099; }
        div#playerLabel { height: 16px; }

        .qr-scanner {
            height: 200px;
            border: 1px solid black;
            text-align: center;
        }
    `;
    }

    render() {
        return html`
        <app-toolbar>
            <button title="Close" @click="${this._close}"><mwc-icon>close</mwc-icon><mwc-ripple unbounded></mwc-ripple></button>
            <span>Erfassen</span>
            <button title="Save" @click="${this._save}"><mwc-icon>save</mwc-icon><mwc-ripple unbounded></mwc-ripple></button>
        </app-toolbar>
        <main>
            <div class="qr-scanner" @click="${this._qrCodeScanned}">QR Code Scanner<br>(Platzhalter)</div>
            <paper-input label="Spieler ID" 
                auto-validate pattern="[a-z0-9]{4}-[a-z0-9]{4}" allowed-pattern="[a-z0-9-]" error-message="Ungültige ID"
                @value-changed="${this._updatePlayerLabel}" ?disabled="${this._wasPlayerIdScanned}">
            </paper-input>
            <div id="playerLabel"></div>
            <div class="slider-container">
                <paper-slider snaps max="10" step="1" value="5" editable></paper-slider> 
                <label>Punkte</label>
            </div>
        </main>
        `;
    }

    constructor() {
        super();
        this.active = false;
        this._wasPlayerIdScanned = false;
    }

    _qrCodeScanned() {
        this.shadowRoot.querySelector('paper-input').value = '1234-abcd';
        this._wasPlayerIdScanned = true;
    }

    _updatePlayerLabel() {
        let id = this.shadowRoot.querySelector('paper-input').value;
        let player = id == "1234-abcd" ? { name: 'Hugo', group: 'Wurscht' } : {} // someService.getPlayer(id)
        this.shadowRoot.querySelector('#playerLabel').textContent = 'name' in player ? `${player.name} - Gruppe: ${player.group}` : '';
    }
    _close() {
        this.active = false;
        this._wasPlayerIdScanned = false;
        this.shadowRoot.querySelector('paper-slider').value = 5;
        this.shadowRoot.querySelector('paper-input').value = "";
    }

    _save() {
        let idField = this.shadowRoot.querySelector('paper-input');
        if (idField.invalid || idField.value == '') return;
        let score = this.shadowRoot.querySelector('paper-slider').value;
        let id = idField.value;
        store.dispatch(addScore({ id, score }));
        this._close();
    }

    static get properties() {
        return {
            active: { type: Boolean, reflect: true },
            _wasPlayerIdScanned: { type: Boolean }
        }
    }
}

window.customElements.define('score-dialog', ScoreDialog);
