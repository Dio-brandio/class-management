import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Classes } from "./class.model";
import { ClassStandards } from "./classStandard.model";
import { Mediums } from "./medium.model";
import { MediumClasses } from "./mediumClasses.model";
import { Subjects } from "./subject.model";
import { StandardSubjects } from "./standardSubject.model";

interface StandardAttributes {
    id?: string;
    name: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface StandardCreationAttributes
    extends Optional<
        StandardAttributes,
        "id" | "isDeleted"
    > { }
// Define the Standard model
class Standards
    extends Model<StandardAttributes, StandardCreationAttributes>
    implements StandardAttributes {
    public id!: string;
    public name!: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        Standards.belongsToMany(Classes, { through: ClassStandards, as: "StandardClasses", foreignKey: 'standardId' })
        Standards.belongsToMany(Mediums, { through:MediumClasses, as: "StandardMedium", foreignKey: 'standardId' })
        Standards.belongsToMany(Subjects, { through:StandardSubjects , as: "StandardSubjects", foreignKey: 'standardId' })
    }
}
Standards.init(
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
        modelName: "Standards",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncStandardTable = async () => {
    try {
        await Standards.sync({ alter: false }); // Syncs the Standard model
        console.log("Standard model synced successfully.");
    } catch (error) {
        console.error("Error syncing Standard model:", error);
    }
};

export { Standards, syncStandardTable };
