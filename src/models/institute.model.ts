import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { InstitueBoards } from "./institueBoards.model";
import { Mediums } from "./medium.model";
import { MediumClasses } from "./mediumClasses.model";
import { Classes } from "./class.model";
import { BoardMediums } from "./boardMedium.model";
import { Standards } from "./standard.model";
import { ClassStandards } from "./classStandard.model";
import { Subjects } from "./subject.model";
import { StandardSubjects } from "./standardSubject.model";

interface InstitueAttributes {
    id?: string;
    name: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface InstitueCreationAttributes
    extends Optional<
        InstitueAttributes,
        "id" | "isDeleted"
    > { }
// Define the Institue model
class Institues
    extends Model<InstitueAttributes, InstitueCreationAttributes>
    implements InstitueAttributes {
    public id!: string;
    public name!: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        Institues.belongsToMany(Boards, { through: InstitueBoards, as: "isntituteBoards", foreignKey: 'instituteId' })
        Institues.belongsToMany(Mediums, { through: BoardMediums, as: "isntituteMediums", foreignKey: 'instituteId' })
        Institues.belongsToMany(Classes, { through: MediumClasses, as: "isntituteClasses", foreignKey: 'instituteId' })
        Institues.belongsToMany(Standards, { through: ClassStandards, as: "isntituteStandars", foreignKey: 'instituteId' })
        Institues.belongsToMany(Subjects, { through: StandardSubjects, as: "isntituteSubejcts", foreignKey: 'instituteId' })
    }
}
Institues.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Automatically sets the creation date
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Automatically sets the update date
        },
    },
    {
        sequelize: sequelizeConfig,
        modelName: "Institues",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncInstitueTable = async () => {
    try {
        await Institues.sync({ alter: false }); // Syncs the Institue model
        console.log("Institue model synced successfully.");
    } catch (error) {
        console.error("Error syncing Institue model:", error);
    }
};

export { Institues, syncInstitueTable };
