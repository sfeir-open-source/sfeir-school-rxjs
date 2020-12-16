import { html } from 'lit-html';
import '../../css/message.css';

/**
 * Basic directive that render a single message
 * @param {Object} state
 */
const messageDirective = ({ author, content, key, time }) => {
  return html`
    <div class="message-container" key="${key}">
      <div class="message">${content}</div>
      <div class="author">${author} · ${time}</div>
    </div>
  `;
};

export default messageDirective;
