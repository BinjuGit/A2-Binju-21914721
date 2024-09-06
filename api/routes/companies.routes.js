module.exports = app => {
    const companies = require("../controllers/company.controller.js");
    
    // Create a new router instance
    var router = require("express").Router();

    // Create a new company for a specific contact
    router.post("/contacts/:contactId/companies", companies.create);

    // Get all companies for a specific contact
    router.get("/contacts/:contactId/companies", companies.findAll);

    // Get a single company by its ID for a specific contact
    router.get("/contacts/:contactId/companies/:companyId", companies.findOne);

    // Update a company by its ID for a specific contact
    router.put("/contacts/:contactId/companies/:companyId", companies.update);

    // Delete a company by its ID for a specific contact
    router.delete("/contacts/:contactId/companies/:companyId", companies.delete);

    // Use the router for all API routes starting with /api
    app.use('/api', router);
};
