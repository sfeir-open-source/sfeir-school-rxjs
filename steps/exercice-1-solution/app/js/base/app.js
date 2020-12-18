//import React, { useEffect, useState } from 'react';
import { render, html } from 'lit-html';

import usersDirective from '../../../../../common/app/js/base/users.js';
import usernameDirective from '../../../../../common/app/js/base/username.js';
import messagesDirective from '../../../../../common/app/js/base/messages.js';
import { SOCKET } from '../../../../../common/app/js/helpers/constants.js';
import '../../../../../common/app/css/app.css';
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
      username: undefined, // User name of current use
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
   *
   * Apply the changes in state according to entry (copy of properties)
   * @param {Object} state
   */
  changeToState(state) {
    if (state.messages) {
      this.state.messages = [
        ...this.state.messages,
        ...state.messages
      ];
    } else {
      this.state = { ...this.state, ...state };
    }
  }

  /**
   * Apply the changes and do a re-render
   * @param {Object} state
   */
  changeToStateAndReRender(state) {
    this.changeToState(state);
    this.renderApp();
  }

  /**
   * Listen to event emits by directive userName (to recieve username and submission)
   * @param {Object} event
   */
  listenerUserName(event) {
    switch (event.type) {
      case 'change':
        this.changeToState({
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
      this.changeToStateAndReRender.bind(this)
    );
  }

  /**
   * ********************
   * LIT HTML DIRECTIVES
   * ********************
   */

  /**
   * Directive that show the users and messages (this will do an observable registration)
   * @param {Object} state
   */
  displayUsersAndMessages({ users, messages, username }) {
    // We will only do a subscription if not already done
    if (!this.unsubscriptionInput) {
      // Minor Hack to avoid multiples subscriptions
      this.unsubscriptionInput = 'notNull';
      // We do a litle timeout to be sure that the rendering of input field is done
      // this is a hack (not the best way to do this but, it's enough for thise example)
      setTimeout(
        () =>
          (this.unsubscriptionInput = subscribeInput({
            username,
            changeToState: this.changeToStateAndReRender.bind(
              this
            )
          })),
        500
      );
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
              eventListener: this.listenerUserName.bind(this)
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
