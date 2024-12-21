import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { Institues } from "./institute.model";
import { Mediums } from "./medium.model";
import { Classes } from "./class.model";
import { Standards } from "./standard.model";

interface ClassStandardAttributes {
    id?: string;
    isntituteId: string;
    boardId: string;
    mediumId: string;
    classId: string;
    standardId: string;
}

// Define an interface for the attributes needed during user creation
interface ClassStandardCreationAttributes
    extends Optional<
        ClassStandardAttributes,
        "id"> { }
// Define the ClassStandard model
class ClassStandards
    extends Model<ClassStandardAttributes, ClassStandardCreationAttributes>
    implements ClassStandardAttributes {
    public id!: string;
    public isntituteId!: string;
    public boardId!: string;
    public mediumId!: string;
    public classId!: string;
    public standardId!: string;
    public static associate() {
    }
}
ClassStandards.init(
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
        },
        standardId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model:Standards ,
                key: "id",
            },
        }
   },
    {
        sequelize: sequelizeConfig,
        modelName: "ClassStandards",

    }
);

const syncClassStandardTable = async () => {
    try {
        await ClassStandards.sync({ alter: false }); // Syncs the ClassStandard model
        console.log("ClassStandard model synced successfully.");
    } catch (error) {
        console.error("Error syncing ClassStandard model:", error);
    }
};

export { ClassStandards, syncClassStandardTable };
