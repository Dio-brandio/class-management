import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { Boards } from "./board.model";
import { Institues } from "./institute.model";
import { Mediums } from "./medium.model";

interface BoardMediumAttributes {
    id?: string;
    isntituteId: string;
    boardId: string;
    mediumId: string;
}

// Define an interface for the attributes needed during user creation
interface BoardMediumCreationAttributes
    extends Optional<
        BoardMediumAttributes,
        "id"> { }
// Define the BoardMedium model
class BoardMediums
    extends Model<BoardMediumAttributes, BoardMediumCreationAttributes>
    implements BoardMediumAttributes {
    public id!: string;
    public isntituteId!: string;
    public boardId!: string;

    public mediumId!: string;

    public static associate() {
    }
}
BoardMediums.init(
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
        }
    },
    {
        sequelize: sequelizeConfig,
        modelName: "BoardMediums",

    }
);

const syncBoardMediumTable = async () => {
    try {
        await BoardMediums.sync({ alter: false }); // Syncs the BoardMedium model
        console.log("BoardMedium model synced successfully.");
    } catch (error) {
        console.error("Error syncing BoardMedium model:", error);
    }
};

export { BoardMediums, syncBoardMediumTable };
