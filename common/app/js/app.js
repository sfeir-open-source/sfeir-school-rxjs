//import React, { useEffect, useState } from 'react';
import { render, html } from 'lit-html';

import usersDirective from './users.js';
import usernameDirective from './username.js';
import messagesDirective from './messages.js';
import '../css/app.css';
import {
  subscriptions,
  subscribeInput
} from './observableLogic.js';

export default class App {
  constructor() {
    this.root = document.getElementById('root');

    this.state = {
      error: undefined,
      username: undefined,
      messages: [],
      users: []
    };
    this.renderApp(this.state);
    this.rxjsSubscriptions();
    this.unsubscriptionInput = undefined;
  }

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

  changeToStateAndReRender(state) {
    this.changeToState(state);
    console.log('change to state', state, this.state);
    this.renderApp();
  }

  rxjsSubscriptions() {
    subscriptions(this.changeToStateAndReRender.bind(this));
  }

  displayUsersAndMessages({ users, messages, username }) {
    if (!this.unsubscriptionInput) {
      this.unsubscriptionInput = 'notNull';
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

  app({ error, username, users, messages }) {
    return html`
      <div class="App">
        <div class="header">
          <h1>Welcome to RxJS-chat !</h1>
        </div>
        ${!username
          ? usernameDirective({
              error,
              username,
              listenerRender: this.changeToState.bind(this)
            })
          : this.displayUsersAndMessages({
              users,
              username,
              messages
            })}
      </div>
    `;
  }

  renderApp() {
    render(this.app(this.state), this.root);
  }
}
