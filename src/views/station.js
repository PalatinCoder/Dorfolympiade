import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../store";
import '../components/data-table';
import '../components/score-dialog';
import { Fab } from "@material/mwc-fab";

class StationView extends connect(store)(PageViewElement) {
    static get styles() {
        return css`
        h2 { 
            text-align: center;
            font-weight: normal;
            font-size: 24px;
            color: #000000de;
        }
        mwc-fab {
            position: fixed;
            bottom: 24px;
            right: 24px;
            --mdc-theme-primary: var(--palette-primary);
            --mdc-theme-secondary: var(--palette-secondary);
            --mdc-theme-on-primary: var(--palette-on-primary);
            --mdc-theme-on-secondary: var(--palette-on-secondary);
        }
    `;
    }

    render() {
        const headings = ['Spieler', 'Gruppe', 'Punktzahl'];
        return html`
        <h2>${this._station.name}</h2>
        <data-table 
            title="Gespeicherte Ergebnisse"
            .headings=${headings}
            .data=${this._scores}>
        </data-table>
        <mwc-fab icon="add" @click="${this._showScoreDialog}"></mwc-fab>

        <score-dialog .active="${false}"></score-dialog>
        `;
    }

    _showScoreDialog() {
        let dialog = this.shadowRoot.querySelector('score-dialog');
        dialog.active = true;
    }

    static get properties() {
        return {
            _station: { type: Object },
            _scores: { type: Array }
        }
    }

    stateChanged(state) {
        this._station = state.app.station;
        this._scores = state.scores;
    }
}

window.customElements.define('station-view', StationView);
