module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        company_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company_address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contactId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts', // References contacts table
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    });

    return Company;
};
