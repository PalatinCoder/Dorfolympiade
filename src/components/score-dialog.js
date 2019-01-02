import { LitElement, html } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../store";
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { Formfield } from "@material/mwc-formfield";

class ScoreDialog extends connect(store)(LitElement) {
    render() {
        return html`
        <style>
            :host {
                position: absolute;
                top: 0;
                left: 0;
                height: 100vh;
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
            }
            app-toolbar button {
                background: none;
                border: none;
                color: var(--palette-on-primary);
                cursor: pointer;
                height: 44px;
                width: 44px;
                outline: none;
                transform: rotate(0deg);
                transition: transform 0.4s ease-out;
            }
            :host([active]) app-toolbar button:first-child {
                transform: rotate(180deg);
            }
            app-toolbar span {
                font-size: 30px;
            }

            main {
                margin-top: 50vh;
                transition: margin-top 0.1s ease-in-out;
                padding: 16px;
            }
            :host([active]) main {
                margin-top: 0px;
            }
            
            mwc-formfield {
                margin: 16px 0;
            }
        </style>
        <app-toolbar>
            <button title="Close" @click="${() => this._close()}"><mwc-icon>close</mwc-icon></button>
            <span>Erfassen</span>
            <button title="Save" @click="${() => this._save()}"><mwc-icon>save</mwc-icon></button>
        </app-toolbar>
        <main>
            <mwc-formfield label="Spieler" alignEnd>
                <input type="text" readonly value="Name">
            </mwc-formfield>
            <mwc-formfield label="Gruppe" alignEnd>
                <input type="text" readonly value="Name">
            </mwc-formfield>
            <mwc-formfield label="Punktzahl" alignEnd>
                <input type="range" min="1" max="10" value="5" step="1">
            </mwc-formfield>
        </main>
        `;
    }

    _close() {
        this.active = false;
    }

    _save() {
        alert('No persistence yet');
        this._close();
    }

    static get properties() {
        return {
            active: { type: Boolean, reflect: true }
        }
    }
}

window.customElements.define('score-dialog', ScoreDialog);
