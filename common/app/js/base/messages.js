import { html } from 'lit-html';
import messageDirective from './message.js';
import '../../css/messages.css';

/**
 * Basic directive that renders the list of messages
 * @param {Object} state
 */
const messagesDirective = ({ messages, username }) => {
  return html`
    <div id="messages-container" class="messages-container">
      ${messages.map(
        message =>
          html`
            ${messageDirective({
              key: '${username}_${index}',
              ...message
            })}
          `
      )}
    </div>
  `;
};

export default messagesDirective;
