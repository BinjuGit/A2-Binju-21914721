import { useState } from 'react';

function NewCompany({ contact, companies, setCompanies }) {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    const handleCreate = async (event) => {
        event.preventDefault();  // Prevent form submission from refreshing the page

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
            }),
        });

        const newCompany = await response.json();

        if (newCompany.company_id) {
            setCompanies([...companies, newCompany]);
            setCompanyName('');  // Reset the input fields
            setCompanyAddress('');
        }
    };
    const handleDelete = async (companyId, event) => {
        event.preventDefault();
        event.stopPropagation();
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${companyId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Remove the deleted company from the companies array in state
            const updatedCompanies = companies.filter((company) => company.company_id !== companyId);
            setCompanies(updatedCompanies);
        }
    };
    const handleUpdate = async (company, event) => {
        event.stopPropagation();

        const updatedCompany = {
            ...company,
            company_name: prompt("Enter new name for the company", company.company_name) || company.company_name,
            company_address: prompt("Enter new address for the company", company.company_address) || company.company_address,
        };

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCompany),
        });

        if (response.ok) {
            const refreshedCompanies = companies.map(comp => 
                comp.company_id === company.company_id ? updatedCompany : comp
            );
            setCompanies(refreshedCompanies);
        } else {
            console.error('Failed to update the company details');
        }
    };

    return (
        <div>
        <form onSubmit={handleCreate} 
        onClick={(e) => e.stopPropagation()}  // Stop event propagation to parent elements
            className='new-company'>
            <label htmlFor='company-name'>Company Name:</label>
            <input
                type='text'
                id='company-name'
                placeholder='Enter the company name'
                onChange={(event) => setCompanyName(event.target.value)}
                value={companyName}
                required
            />
            <label htmlFor='company-address'>Company Address:</label>
            <input
                type='text'
                id='company-address'
                placeholder='Enter the company address'
                
                onChange={(event) => setCompanyAddress(event.target.value)}
                value={companyAddress}
            />
            <button className='button green' type='submit'>
                Create companyName
            </button>
        </form>
          {/* Table to Display Companies */}
          <div className="company-list">
               <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.company_id}>
                            <td>{company.company_name}</td>
                            <td>{company.company_address}</td>
                            <td>
                                
                            <button
                                    className="button blue"
                                    onClick={(event) => handleUpdate(company, event)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"    className="button red" 
                                    onClick={(event) => handleDelete(company.company_id, event)}>
                                    
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default NewCompany;
