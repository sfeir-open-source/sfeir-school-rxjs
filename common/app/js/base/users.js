import { render, html } from 'lit-html';
import '../../css/users.css';

/**
 * Basic directive that render the list of users
 * @param {Object} state
 */
const usersDirective = ({ users }) => {
  return html`
    <div className="users">
      <h2>Who's online ?</h2>
      <ul>
        ${users.map(
          user =>
            html`
              <li key="${user}">${user}</li>
            `
        )}
      </ul>
    </div>
  `;
};

export default usersDirective;
