import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import '../components/data-table';
import { Fab } from "@material/mwc-fab";

class StationView extends PageViewElement {
    render() {
        const data = [
                ['Sunny', 'Schützen', 10],
                ['Jessy', 'Schützen', 10],
                ['Markus', 'Hütte', 10],
                ['b9396386-6463-4249-bb9b-601a17a9d921', 'unbekannt', 10],
            ];
        const headings = ['Spieler', 'Gruppe', 'Punktzahl'];
        return html`
        <style>
            h2 { 
                text-align: center;
                font-weight: normal;
                font-size: 24px;
                color: #000000de;
            }
            h3 { 
                height: 40; /* 64px - padding */ 
                padding: 12px;
                font-size: 20px; 
                font-weight: normal;
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
        </style>
        <h2>Feuerwehr</h2>
        <h3>Gespeicherte Ergebnisse</h3>
        <data-table 
            .headings=${headings}
            .data=${data}>
        </data-table>
        <mwc-fab icon="add" @click="${this._click}"></mwc-fab>
        `;
    }

    _click() {
        alert('Not yet implemented ;)');
    }
}

window.customElements.define('station-view', StationView);
