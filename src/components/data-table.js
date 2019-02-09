import { LitElement, html, css } from 'lit-element';
import { repeat } from "lit-html/directives/repeat";

class DataTable extends LitElement {
    static get styles() {
        return css`
        h3 { 
            height: 40px; /* 64px - margin */ 
            margin: 12px;
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
    `;
    }

    render() {
        return html`
        <h3>${this.title}</h3>
        <table>
            <thead>
                ${repeat(this.headings, (i) => html`<th>${i}</th>`)}
            </thead>
            <tbody>
                ${repeat(this.data, (row) => html`
                    <tr>
                        ${row.map((value) => html`<td>${value}</td>`)}
                    </tr>
                `)}
            </tbody>
        </table>
        `;
    }

    static get properties() { return {
        title: { type: String },
        headings: { type: Array },
        data: { type: Array }
    }}
}

window.customElements.define('data-table', DataTable);
