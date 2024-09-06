import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';
import CompanyList from './CompanyList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost/api/contacts/' + contact.id + '/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        
        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

     // Function to update the contact
     async function doUpdate(e) {
        e.stopPropagation();

        const updatedContact = {
            ...contact,
            name: prompt("Update contact name", contact.name) || contact.name,
            email: prompt("Update contact email", contact.email) || contact.email
        };

        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact),
        });

        if (response.ok) {
            const newContacts = contacts.map(c => (c.id === contact.id ? updatedContact : c));
            setContacts(newContacts);
        } else {
            console.error('Failed to update the contact');
        }
    }

	 // Modify return section for contact summary, expand/collapse, and edit
     return (
        <div key={contact.id} className='contact' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                {/* Contact Summary */}
                <h3>{contact.name} - {contact.email}</h3>
                <p>
                    <strong>Phone Count:</strong> {phones.length} | <strong>Company Count:</strong> {companies.length}
                </p>

                {/* Edit and Delete Buttons */}
                <button className='button blue' onClick={doUpdate}>Edit Contact</button>
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            {/* Expanded Phones and Companies Information */}
            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                <hr />
                <CompanyList companies={companies} setCompanies={setCompanies} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;