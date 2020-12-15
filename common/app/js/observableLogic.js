import { SOCKET } from './constants';
import { getHourTime } from './helpers';
import { Observable, fromEvent } from 'rxjs';
import {
  distinctUntilChanged,
  tap,
  filter,
  pluck,
  throttleTime
} from 'rxjs/operators';

const messages$ = new Observable(subscriber => {
  SOCKET.on('new-message', message => {
    subscriber.next(message);
  });
});

const users$ = new Observable(subscriber => {
  SOCKET.on('refresh-users', users => {
    subscriber.next(users);
  });
});

const username$ = new Observable(subscriber => {
  SOCKET.on('new-user', response => {
    if (response.ok) {
      subscriber.next(response);
    } else {
      subscriber.error('This username is already taken.');
    }
  });
});

export const subscriptions = changeToState => {
  const subscribeToMessages = () => {
    const subscription = messages$.subscribe(message => {
      changeToState({ messages: [message] });
    });
    return () => subscription.unsubscribe();
  };

  const subscribeToUsers = () => {
    const subscription = users$.subscribe(users => {
      changeToState({ users });
    });
    return () => subscription.unsubscribe();
  };

  const subscribeToUsername = () => {
    const subscription = username$.subscribe({
      next(response) {
        changeToState({ username: response.username });
      },
      error(errorMsg) {
        changeToState({ error });
      }
    });
    return () => subscription.unsubscribe();
  };

  const unsubscribeToMessages = subscribeToMessages();
  const unsubscribeToUsers = subscribeToUsers();
  const unsubscribeToUsername = subscribeToUsername();
  return {
    unsubscribeToMessages,
    unsubscribeToUsers,
    unsubscribeToUsername
  };
};

export const subscribeInput = ({ username, changeToState }) => {
  const subscribeToInput = () => {
    const textInput = document.getElementById('text-input');
    const inputSubscription = fromEvent(textInput, 'keyup')
      .pipe(
        tap(e => console.log(e)),
        filter(e => e.keyCode === 13),
        throttleTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter(message => message.trim().length > 0)
      )
      .subscribe(value => {
        SOCKET.emit('new-message', {
          author: username,
          content: value,
          time: getHourTime()
        });
        textInput.value = '';
      });
    return () => inputSubscription.unsubscribe();
  };

  return subscribeToInput();
};
