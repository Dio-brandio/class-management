import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";

interface ClassAttributes {
    id?: string;
    name: string;
    desc?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface ClassCreationAttributes
    extends Optional<
        ClassAttributes,
        "id" | "isDeleted" | "desc"> { }
// Define the Class model
class Classes
    extends Model<ClassAttributes, ClassCreationAttributes>
    implements ClassAttributes {
    public id!: string;
    public name!: string;
    public desc?: string;
    public logo?: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
    }
}
Classes.init(
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
        modelName: "Classs",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncClassTable = async () => {
    try {
        await Classes.sync({ alter: false }); // Syncs the Class model
        console.log("Class model synced successfully.");
    } catch (error) {
        console.error("Error syncing Class model:", error);
    }
};

export { Classes, syncClassTable };

