import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { BoardMediums } from "./boardMedium.model";
import { Classes } from "./class.model";
import { MediumClasses } from "./mediumClasses.model";
import { Standards } from "./standard.model";
import { ClassStandards } from "./classStandard.model";
import { Subjects } from "./subject.model";
import { StandardSubjects } from "./standardSubject.model";

interface MediumAttributes {
    id?: string;
    name: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface MediumCreationAttributes
    extends Optional<
        MediumAttributes,
        "id" | "isDeleted"
    > { }
// Define the Medium model
class Mediums
    extends Model<MediumAttributes, MediumCreationAttributes>
    implements MediumAttributes {
    public id!: string;
    public name!: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        Mediums.belongsToMany(Boards, { through: BoardMediums, as: "MediumBoards", foreignKey: 'mediumId' })
        Mediums.belongsToMany(Classes, { through: MediumClasses, as: "MediumClasses", foreignKey: 'mediumId' })
        Mediums.belongsToMany(Standards, { through: ClassStandards, as: "MediumStandards", foreignKey: 'mediumId' })
        Mediums.belongsToMany(Subjects, { through: StandardSubjects, as: "MediumSubjects", foreignKey: 'mediumId' })
    }
}
Mediums.init(
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
        modelName: "Mediums",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncMediumTable = async () => {
    try {
        await Mediums.sync({ alter: false }); // Syncs the Medium model
        console.log("Medium model synced successfully.");
    } catch (error) {
        console.error("Error syncing Medium model:", error);
    }
};

export { Mediums, syncMediumTable };
