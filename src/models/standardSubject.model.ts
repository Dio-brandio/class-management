import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { Institues } from "./institute.model";
import { Mediums } from "./medium.model";
import { Classes } from "./class.model";
import { Standards } from "./standard.model";
import { Subjects } from "./subject.model";

interface StandardSubjectAttributes {
    id?: string;
    isntituteId: string;
    boardId: string;
    mediumId: string;
    classId: string;
    standardId: string;
    subjectId: string;
}

// Define an interface for the attributes needed during user creation
interface StandardSubjectCreationAttributes
    extends Optional<
        StandardSubjectAttributes,
        "id"> { }
// Define the StandardSubject model
class StandardSubjects
    extends Model<StandardSubjectAttributes, StandardSubjectCreationAttributes>
    implements StandardSubjectAttributes {
    public id!: string;
    public isntituteId!: string;
    public boardId!: string;
    public mediumId!: string;
    public classId!: string;
    public standardId!: string;
    public subjectId!: string;
    public static associate() {
    }
}
StandardSubjects.init(
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
                model: Standards,
                key: "id",
            },
        },
         subjectId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Subjects,
                key: "id",
            },
        }
   },
    {
        sequelize: sequelizeConfig,
        modelName: "StandardSubjects",

    }
);

const syncStandardSubjectTable = async () => {
    try {
        await StandardSubjects.sync({ alter: false }); // Syncs the StandardSubject model
        console.log("StandardSubject model synced successfully.");
    } catch (error) {
        console.error("Error syncing StandardSubject model:", error);
    }
};

export { StandardSubjects, syncStandardSubjectTable };
