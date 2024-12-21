import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Standards } from "./standard.model";
import { StandardSubjects } from "./standardSubject.model";
import { ClassStandards } from "./classStandard.model";

interface SubjectAttributes {
    id?: string;
    name: string;
    desc?: string;
    logo?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface SubjectCreationAttributes
    extends Optional<
        SubjectAttributes,
        "id" | "isDeleted" | "desc" | "logo"
    > { }
// Define the Subject model
class Subjects
    extends Model<SubjectAttributes, SubjectCreationAttributes>
    implements SubjectAttributes {
    public id!: string;
    public name!: string;
    public desc?: string;
    public logo?: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        Subjects.belongsToMany(Standards,{through:StandardSubjects,as:"SubjectStandards",foreignKey:'subjectId'})
    }
}
Subjects.init(
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
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        logo: {
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
        modelName: "Subjects",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncSubjectTable = async () => {
    try {
        await Subjects.sync({ alter: false }); // Syncs the Subject model
        console.log("Subject model synced successfully.");
    } catch (error) {
        console.error("Error syncing Subject model:", error);
    }
};

export { Subjects, syncSubjectTable };
