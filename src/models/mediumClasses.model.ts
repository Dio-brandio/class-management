import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { Institues } from "./institute.model";
import { Mediums } from "./medium.model";
import { Classes } from "./class.model";

interface MediumClassAttributes {
    id?: string;
    isntituteId: string;
    boardId: string;
    mediumId: string;
    classId: string;
}

// Define an interface for the attributes needed during user creation
interface MediumClassCreationAttributes
    extends Optional<
        MediumClassAttributes,
        "id"> { }
// Define the MediumClass model
class MediumClasses
    extends Model<MediumClassAttributes, MediumClassCreationAttributes>
    implements MediumClassAttributes {
    public id!: string;
    public isntituteId!: string;
    public boardId!: string;
    public mediumId!: string;
    public classId!: string;
    public static associate() {
    }
}
MediumClasses.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        boardId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Boards,
                key: "id",
            },
        },
        isntituteId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Institues,
                key: "id",
            },
        },
        mediumId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Mediums,
                key: "id",
            },
        },

        classId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Classes,
                key: "id",
            },
        }
    },
    {
        sequelize: sequelizeConfig,
        modelName: "MediumClasss",

    }
);

const syncMediumClassTable = async () => {
    try {
        await MediumClasses.sync({ alter: false }); // Syncs the MediumClass model
        console.log("MediumClass model synced successfully.");
    } catch (error) {
        console.error("Error syncing MediumClass model:", error);
    }
};

export { MediumClasses, syncMediumClassTable };
