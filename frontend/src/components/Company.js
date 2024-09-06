function Company({ contact, company, companies, setCompanies }) {

    // Function to delete a company
    const handleDelete = async () => {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${company.company_id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const updatedCompanies = companies.filter(comp => comp.company_id !== company.company_id);
            setCompanies(updatedCompanies);
        }
    };

    // Function to update a company
    const handleUpdate = async (event) => {
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
            const refreshedCompanies = companies.map(comp => (comp.company_id === company.company_id ? updatedCompany : comp));
            setCompanies(refreshedCompanies);
        } else {
            console.error('Failed to update the company details');
        }
    };

    
}

export default Company;
