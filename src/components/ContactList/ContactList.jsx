import ContactItem from '../ContactItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <>
      {contacts.length > 0 && (
        <ul>
          {contacts.map(({ id, name, number }) => (
            <ContactItem
              key={nanoid()}
              name={name}
              number={number}
              handleDelete={() => {
                handleDelete(id);
              }}
            />
          ))}
        </ul>
      )}
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
