import { Institues } from "@models";
import { WhereOptions } from "sequelize";
import { ICreateInstituteDTO } from "src/dtos/IInstitue.dto";

async function createInstitue(institutionData: ICreateInstituteDTO) {
    const { name } = institutionData

    const isntitution = new Institues({
        name
    })
    await isntitution.save()
    return isntitution
}
async function getInstitues() {
    const isntitution = await Institues.findAll({
        where: {
            isDeleted: false
        }
    })
    return isntitution
}

export { createInstitue, getInstitues }