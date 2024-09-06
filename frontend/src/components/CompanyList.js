import Company from './Company';
import NewCompany from './NewCompany';

function CompanyList({ contact, companies, setCompanies }) {
    return (
        <div className='company-list'>
            <NewCompany companies={companies} setCompanies={setCompanies} contact={contact} />

            <table>
                
                <tbody>
                    {companies.map((company) => (
                        <Company
                            key={company.company_id}
                            company={company}
                            companies={companies}
                            setCompanies={setCompanies}
                            contact={contact}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
