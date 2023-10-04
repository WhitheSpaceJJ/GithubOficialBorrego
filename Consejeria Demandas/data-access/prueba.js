const EtniaDAO = require('../data-access/etniaDAO')

async function transaction() {
    try {
        const etnia = await EtniaDAO.crearEtnia({ nombre: 'etnia 1' })
        console.log(etnia)
    } catch (err) {
        console.log(err)
    }
}

transaction()