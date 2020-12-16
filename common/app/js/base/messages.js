import { html } from 'lit-html';
import messageDirective from './message.js';
import '../../css/messages.css';

/**
 * Basic directive that render the list of messages
 * @param {Object} state
 */
const messagesDirective = ({ messages, username }) => {
  return html`
    <div id="messages-container" class="messages-container">
      ${messages.map(
        (message, index) =>
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
