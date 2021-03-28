import { html } from 'lit-html';
import '../../css/username.css';

/**
 * Basic directive that renders the "login screen"
 * @param {Object} state
 */
const usernameDirective = ({ error, eventListener }) => {
  let savedUsername = undefined;

  // Listener for change event, it will capture the event
  const changeListener = {
    handleEvent(e) {
      const username = e.target.value;
      if (username !== savedUsername) {
        savedUsername = username;
        eventListener({
          type: 'change',
          username,
          error: null
        });
      }
    },
    capture: true
  };

  // Listener for submit event, it will capture the event
  const submitListener = {
    handleEvent(e) {
      // We cancel the dom event to avoid a refresh of the page
      e.preventDefault();
      eventListener({
        type: 'submit',
        username: savedUsername
      });
    },
    capture: true
  };

  // We return the lit template
  return html`
    <div class="username-container">
      <h2>Choose a username</h2>
      <div>
        <form id="myForm" @submit="${submitListener}">
          <input
            id="username-input"
            type="text"
            value=${savedUsername ? savedUsername : ''}
            placeholder="Type your username here"
            @change="${changeListener}"
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
