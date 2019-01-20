import { html } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../store";

class DeviceInfoView extends connect(store)(PageViewElement) {
    render() {
        return html`
        <style>
            h2 {
                text-align: center;
                font-weight: normal;
                color: var(--palette-text-primary);
            }
            .captioned::first-line {
                font-size: 14px;
                color: var(--palette-text-secondary);
            }
        </style>
        <main>
            <h2>Geräteinformationen</h2>
            <canvas id="deviceId"></canvas>
            <p class="captioned">
                Geräte ID <br>
                ${this._deviceId}
            </p>
            <p class="captioned">
                Zugeordnete Station <br>
                ${this._station}
            </p>
        </main>
        `;
    };

    constructor() {
        super();
    }

    updated(changedProperties) {
        if (changedProperties.has('_deviceId')) {
            let canvas = this.shadowRoot.querySelector('canvas#deviceId');
            // QRCode is globally defined via the global import in index.html
            QRCode.toCanvas(canvas, this._deviceId, { margin: 0, width: 150 });
        }
    }

    static get properties() { return {
        _deviceId: { type: String },
        _station: { type: String },
    }};

    stateChanged(state) {
        this._station = state.app.station.name;
        this._deviceId = state.app.deviceId;
    }
}

window.customElements.define('deviceinfo-view', DeviceInfoView);
