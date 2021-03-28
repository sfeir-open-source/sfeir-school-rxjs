import { SOCKET } from '../helpers/constants';
import { getHourTime } from '../helpers/helpers';
import { Observable, fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  pluck,
  throttleTime
} from 'rxjs/operators';

/**
 * *************************
 * *************************
 * File with all RxJS logic
 * *************************
 * *************************
 */

/**
 * *************************
 * RxJS Observable declaration
 * *************************
 */

/**
 * Observable that transforms socket of new-message events to observable of message
 */
const messages$ = new Observable(subscriber => {
  SOCKET.on('new-message', message => {
    subscriber.next(message);
  });
});

/**
 * Observable that transforms socket of refresh-users events to observable of users
 */
const users$ = new Observable(subscriber => {
  SOCKET.on('refresh-users', users => {
    subscriber.next(users);
  });
});

/**
 * Observable that transforms socket of new-user events to observable of user (with error management)
 */
const username$ = new Observable(subscriber => {
  SOCKET.on('new-user', response => {
    if (response.ok) {
      subscriber.next(response);
    } else {
      subscriber.error('This username is already taken.');
    }
  });
});

/**
 * Observable that transforms input text to stream of messages that are validated only if Enter has been hit
 */
const textInput$ = () => {
  const textInput = document.getElementById('text-input');
  return fromEvent(textInput, 'keyup').pipe(
    filter(e => e.code === 'Enter'),
    filter(e => e.target.value.trim().length > 0),
    throttleTime(1000),
    pluck('target'),
    distinctUntilChanged(
      (value1, value2) => value1 === value2,
      target => target.value
    )
  );
};

/**
 * *************************
 * RxJS Observable subscriptions
 * *************************
 */

/**
 * Method that subscribes to all Observables coming from Socket
 * @param {function} updateState
 */
export const subscribeToSocketObservable = updateState => {
  /**
   * Subscription to incoming messages
   */
  const subscribeToMessages = () => {
    const subscription = messages$.subscribe(message => {
      updateState({ messages: [message] });
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to incoming users
   */
  const subscribeToUsers = () => {
    const subscription = users$.subscribe(users => {
      updateState({ users });
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to user validation
   */
  const subscribeToUsername = () => {
    const subscription = username$.subscribe({
      next(response) {
        updateState({ username: response.username });
      },
      error(errorMessage) {
        updateState({ error: errorMessage });
      }
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to all streams to get unsubscription methods
   */
  const unsubscribeToMessages = subscribeToMessages();
  const unsubscribeToUsers = subscribeToUsers();
  const unsubscribeToUsername = subscribeToUsername();
  return {
    unsubscribeToMessages,
    unsubscribeToUsers,
    unsubscribeToUsername
  };
};

/**
 * Method that subscribes to stream of text input (message)
 * @param {Object} state
 */
export const subscribeInput = ({ username }) => {
  const subscribeToInput = () => {
    const inputSubscription = textInput$().subscribe(
      inputElement => {
        // When the stream emits a message we forward it to socket
        SOCKET.emit('new-message', {
          author: username,
          content: inputElement.value,
          time: getHourTime()
        });
        inputElement.value = '';
      }
    );
    return () => inputSubscription.unsubscribe();
  };

  // We return the subscription to be sure that the unsubscription could be done
  return subscribeToInput();
};
