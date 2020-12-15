import { html } from 'lit-html';
import messageDirective from './message.js';
import '../css/messages.css';

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
