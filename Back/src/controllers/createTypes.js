const {Type}=require('../db')

const createTypes = async (typesArray) => {
    for (const element of typesArray) {
        await Type.create({ name: element.name });
    }
    return 'se añadieron los types exitosamente '
};
module.exports = createTypes;
