import { render, html } from 'lit-html';

import usersDirective from './users.js';
import usernameDirective from './username.js';
import messagesDirective from './messages.js';
import { SOCKET } from '../helpers/constants.js';
import '../../css/app.css';
import {
  subscribeToSocketObservable,
  subscribeInput
} from '../rx/observableLogic.js';

/**
 * Class for the App RxJS Chat
 */
export default class App {
  constructor() {
    // Dom element where lit will insert the template
    this.root = document.getElementById('root');

    // State of the app
    this.state = {
      error: undefined, // Error Message
      username: undefined, // Username of current user
      messages: [], // List of incoming messages
      users: [] // List of connected users
    };
    // RxJS unsubscription callback of input field
    this.unsubscriptionInput = undefined;

    // We render the app using the state
    this.renderApp(this.state);

    // We subscribe to all observables
    this.rxjsSubscriptions();
  }

  /**
   * ********************
   * State and Render
   * ********************
   */

  /**
   * Render the app using LitHTML
   */
  renderApp() {
    render(this.app(this.state), this.root);
  }

  /**
   * Apply the changes in state according to entry (copy of properties)
   * @param {Object} statePatch
   */
  updateState(statePatch) {
    if (statePatch.messages) {
      this.state.messages = [
        ...this.state.messages,
        ...statePatch.messages
      ];
    } else {
      this.state = { ...this.state, ...statePatch };
    }
  }

  /**
   * Apply the changes and do a re-render
   * @param {Object} statePatch
   */
  updateStateAndReRender(statePatch) {
    this.updateState(statePatch);
    this.renderApp();
  }

  /**
   * Listen to event emitted by username directive (to receive username and submission)
   * @param {Object} event
   */
  usernameListener(event) {
    switch (event.type) {
      case 'change':
        this.updateState({
          username: event.username,
          error: event.error
        });
        break;
      case 'submit':
        SOCKET.emit('new-user', { username: event.username });
        break;
    }
  }

  /**
   * ********************
   * RXJS Subscriptions
   * ********************
   */

  rxjsSubscriptions() {
    subscribeToSocketObservable(
      this.updateStateAndReRender.bind(this)
    );
  }

  /**
   * ********************
   * LIT HTML DIRECTIVES
   * ********************
   */

  /**
   * Directive that shows the users and messages (this will do an observable registration)
   * @param {Object} state
   */
  displayUsersAndMessages({ users, messages, username }) {
    // We will do a subscription only if not already done
    if (!this.unsubscriptionInput) {
      // Minor Hack to avoid multiple subscriptions
      this.unsubscriptionInput = 'notNull';
      // We do a little timeout to be sure that the rendering of input field is done
      // this is a hack (not the best way to do this but, it's enough for this example)
      setTimeout(() => {
        this.unsubscriptionInput = subscribeInput({
          username
        });
      }, 500);
    }
    // We return the litHtml template
    return html`
      <div class="screen">
        ${usersDirective({ users })}
        <div class="chatbox">
          ${messagesDirective({ messages, username })}
          <div class="text-container">
            <input
              id="text-input"
              type="text"
              placeholder="Type your text here"
            />
            <span class="info">
              Press Enter to send your message
            </span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Main App directive
   * @param {Object} state
   */
  app({ error, username, users, messages }) {
    // We return the lit html template
    return html`
      <div class="App">
        <div class="header">
          <h1>Welcome to RxJS-chat !</h1>
        </div>
        ${!username || error
          ? usernameDirective({
              error,
              username,
              eventListener: this.usernameListener.bind(this)
            })
          : this.displayUsersAndMessages({
              users,
              username,
              messages
            })}
      </div>
    `;
  }
}
