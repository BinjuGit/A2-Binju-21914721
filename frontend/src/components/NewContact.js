import { useState } from 'react';

function NewContact(props) {
    const {contacts, setContacts} = props;
    const [name, setName] = useState('');
    const [address, setAddress]= useState('')

    async function createContact(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        });

        const data = await response.json();

        if (data.id) {
            setContacts([...contacts, data]);
        }

        setName('');
        setAddress('')
    }



    return (
        <form className='new-contact' onSubmit={createContact}>
            {/* Label and Input for Contact Name */}
            <label htmlFor='contact-name'>Contact Name:</label>
            <input
                type='text'
                id='contact-name'
                placeholder='Enter contact name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            {/* Label and Input for Contact Address */}
            <label htmlFor='contact-address'>Contact Address:</label>
            <input
                type='text'
                id='contact-address'
                placeholder='Enter contact address'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            />

            {/* Submit Button */}
            <button className='button green' type='submit'>
                Create Contact
            </button>
        </form>
    );
    }

export default NewContact;