const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Companies = db.companies;
const Op = db.Sequelize.Op;

exports.calculate = (req, res) => {
    Promise.all([
        Contacts.count(),
        Phones.count(),
        Companies.count(),
        Contacts.max('updatedAt'),
        Contacts.min('createdAt')
    ])
    .then(([totalContacts, totalPhones, totalCompanies, lastUpdatedContact, oldestContact]) => {
        res.send({
            totalContacts: totalContacts,
            totalPhones: totalPhones,
            totalCompanies: totalCompanies,
            lastUpdatedContact: lastUpdatedContact,
            oldestContact: oldestContact
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while performing the calculation."
        });
    });
};
