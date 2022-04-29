import { SOCKET } from '../../../../../common/app/js/helpers/constants';
import { getHourTime } from '../../../../../common/app/js/helpers/helpers';
// TODO correct Imports from rx

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
 * Observable that transforms socket 'new-message' to observable of message
 */
// TODO create Observable message$

/**
 * Observable that transforms socket 'refresh-users' to observable of users
 */
// TODO create Observable users$

/**
 * Observable that transforms socket 'new-user' to observable of user (with error management)
 */
// TODO create Observable username$

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
    // Subscribe to message$
    // use changeToState to propagate the message (an Object) {messages:...}
    return () => {
      // and don't forget to unsubscribe here!
    };
  };

  /**
   * Subscription to incoming users
   */
  const subscribeToUsers = () => {
    // Subscribe to users$
    // use changeToState to propagate the message (an Object) {users:...}
    return () => {
      // and don't forget to unsubscribe here!
    };
  };

  /**
   * Subscription to user validation
   */
  const subscribeToUsername = () => {
    // Subscribe to username$
    // use changeToState to propagate the message (an Object)   {username:...}
    // don't forget to deal with error ;) and propagate error with changeToState {error:...}
    return () => {
      // and don't forget to unsubscribe here!
    };
  };

  /**
   * Subscription to all streams to get unsubscriptions methods
   */
  // TODO Do something to really listen ;) Remember observable is just a function
  return {};
};

/**
 * Method that subscribes to stream of text input (message)
 * @param {function} changeToState
 */
export const subscribeInput = ({ username, changeToState }) => {
  const subscribeToInput = () => {
    // Nothing to do now
  };

  // We return the subscription to be sure that the unsubscription could be done
  return subscribeToInput();
};
