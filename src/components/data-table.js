import { LitElement, html } from '@polymer/lit-element';
import { repeat } from "lit-html/directives/repeat";

class DataTable extends LitElement {
    render() {
        const { headings, data } = this;
        return html`
        <style>
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
        </style>
        <table>
            <thead>
                ${repeat(headings, (i) => html`<th>${i}</th>`)}
            </thead>
            <tbody>
                ${repeat(data, (row) => html`
                    <tr>
                        ${row.map((value) => html`<td>${value}</td>`)}
                    </tr>
                `)}
            </tbody>
        </table>
        `;
    }

    static get properties() { return {
        headings: { type: Array },
        data: { type: Array }
    }}
}

window.customElements.define('data-table', DataTable);
