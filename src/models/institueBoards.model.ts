import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { Institues } from "./institute.model";

interface InstitueBoardAttributes {
    id?: string;
    isntituteId: string;
    boardId: string;
}

// Define an interface for the attributes needed during user creation
interface InstitueBoardCreationAttributes
    extends Optional<
        InstitueBoardAttributes,
        "id"> { }
// Define the InstitueBoard model
class InstitueBoards
    extends Model<InstitueBoardAttributes, InstitueBoardCreationAttributes>
    implements InstitueBoardAttributes {
    public id!: string;
    public isntituteId!: string;
    public boardId!: string;


    public static associate() {

    }
}
InstitueBoards.init(
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

        }
    },
    {
        sequelize: sequelizeConfig,
        modelName: "InstitueBoards",

    }
);

const syncInstitueBoardTable = async () => {
    try {
        await InstitueBoards.sync({ alter: false }); // Syncs the InstitueBoard model
        console.log("InstitueBoard model synced successfully.");
    } catch (error) {
        console.error("Error syncing InstitueBoard model:", error);
    }
};

export { InstitueBoards, syncInstitueBoardTable };
