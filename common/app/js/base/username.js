import { html } from 'lit-html';

import '../../css/username.css';

/**
 * Basic directive that render the "login screen"
 * @param {Object} state
 */
const usernameDirective = ({ error, eventListener }) => {
  let usernameTemp = undefined;

  // Listener for change event, it will bubble the event
  const listenerChange = {
    handleEvent(e) {
      // We check that the input change since last event
      if (e.target.value !== usernameTemp) {
        usernameTemp = e.target.value;
        eventListener({
          type: 'change',
          username: usernameTemp,
          error: null
        });
      }
    },
    capture: true
  };

  // Listener for submit event, it will bubble the event
  const listenerSubmit = {
    handleEvent(e) {
      // We cancel the dom event to avoid a refresh of the page
      e.preventDefault();
      eventListener({ type: 'submit', username: usernameTemp });
    },
    capture: true
  };

  // We return the lit template
  return html`
    <div class="username-container">
      <h2>Choose a username</h2>
      <div>
        <form id="myForm" @submit="${listenerSubmit}">
          <input
            id="username-input"
            type="text"
            value=${usernameTemp ? usernameTemp : ''}
            placeholder="Type your username here"
            @change="${listenerChange}"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
    ${error &&
      html`
        <p class="error">${error}</p>
      `}
  `;
};

export default usernameDirective;
