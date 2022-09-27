import PropTypes from 'prop-types';

import s from './ContactItem.module.css';

const ContactItem = ({ name, number, handleDelete }) => {
  return (
    <li className={s.item}>
      <p>
        <span>{name}</span>: {number}
      </p>
      <button className={s.button} onClick={handleDelete} type="button">
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactItem;
