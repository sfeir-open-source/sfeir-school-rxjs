import { html } from 'lit-html';
import { SOCKET } from './constants.js';
import '../css/username.css';

const usernameDirective = ({ error, listenerRender }) => {
  let usernameTemp = undefined;

  const listenerChange = {
    handleEvent(e) {
      if (e.target.value !== usernameTemp) {
        usernameTemp = e.target.value;
        listenerRender({ username: usernameTemp });
        console.log('clicked');
      }
    },
    capture: true
  };

  const listenerSubmit = {
    handleEvent(e) {
      e.preventDefault();
      console.log('New User submit', usernameTemp);
      SOCKET.emit('new-user', { username: usernameTemp });
    },
    capture: true
  };

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
