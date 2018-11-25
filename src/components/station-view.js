import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

class StationView extends PageViewElement {
    render() {
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
            table { width: 100%; }
            table th, table td { 
                height: 24px; /* 48 - padding */
                padding: 12px;
            }
            table th {
                border-bottom: 1px solid rgba(0,0,0,0.12);
                text-align: left;
                font-weight: normal;
                font-size: 12px;
                color: #00000099;
            }
            table td {
                font-size: 14px;
                color: #000000de;
            }
            table td:last-child { text-align: right; }
        </style>
        <h2>Feuerwehr</h2>
        <h3>Gespeicherte Ergebnisse</h3>
        <table>
            <thead>
                <th>Spieler</th>
                <th>Gruppe</th>
                <th>Punktzahl</th>
            </thead>
            <tbody>
                <tr>
                    <td>Sunny</td>
                    <td>Schützen</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Jessy</td>
                    <td>Schützen</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>Markus</td>
                    <td>Hütte</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>b9396386-6463-4249-bb9b-601a17a9d921</td>
                    <td>unbekannt</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
        `;
    }
}

window.customElements.define('station-view', StationView);
