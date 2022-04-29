import { SOCKET } from '../../../../../common/app/js/helpers/constants';
import { getHourTime } from '../../../../../common/app/js/helpers/helpers';
import { Observable, fromEvent } from 'rxjs';

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
 * Observable that transforms socket new-message to observable of messages
 */
const messages$ = new Observable(subscriber => {
  SOCKET.on('new-message', message => {
    subscriber.next(message);
  });
});

/**
 * Observable that transforms socket refresh-user to observable of users
 */
const users$ = new Observable(subscriber => {
  SOCKET.on('refresh-users', users => {
    subscriber.next(users);
  });
});

/**
 * Observable that transforms socket new-user to observable of users (with error management)
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
 * Observable that transforms input type to stream of message that is validate only is Enter is hit
 */
const textInput$ = () => {
  const textInput = document.getElementById('text-input');
  return fromEvent(textInput, 'keyup');
};

/**
 * *************************
 * RxJS Observable subscriptions
 * *************************
 */

/**
 * Method that subscribes all Observables coming from Socket
 * @param {function} changeToState
 */
export const subscribeToSocketObservable = changeToState => {
  /**
   * Subscription to incoming messages
   */
  const subscribeToMessages = () => {
    const subscription = messages$.subscribe(message => {
      changeToState({ messages: [message] });
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to incoming users
   */
  const subscribeToUsers = () => {
    const subscription = users$.subscribe(users => {
      changeToState({ users });
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to user validation
   */
  const subscribeToUsername = () => {
    const subscription = username$.subscribe({
      next(response) {
        changeToState({ username: response.username });
      },
      error(errorMsg) {
        changeToState({ error: errorMsg });
      }
    });
    return () => subscription.unsubscribe();
  };

  /**
   * Subscription to all streams to get unsubscriptions methods
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
    const inputSubscription = textInput$().subscribe(event => {
      if (event.code === 'Enter') {
        // When the stream emit a message we forward it to socket
        SOCKET.emit('new-message', {
          author: username,
          content: event.target.value,
          time: getHourTime()
        });
        event.target.value = '';
      }
    });
    return () => inputSubscription.unsubscribe();
  };

  // We return the subscription to be sure that the unsubscription could be done
  return subscribeToInput();
};
