import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { InstitueBoards } from "./institueBoards.model";
import { Institues } from "./institute.model";
import { Mediums } from "./medium.model";
import { Classes } from "./class.model";
import { BoardMediums } from "./boardMedium.model";
import { MediumClasses } from "./mediumClasses.model";
import { Standards } from "./standard.model";
import { ClassStandards } from "./classStandard.model";
import { Subjects } from "./subject.model";
import { StandardSubjects } from "./standardSubject.model";

interface BoardAttributes {
    id?: string;
    name: string;
    desc?: string;
    logo?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define an interface for the attributes needed during user creation
interface BoardCreationAttributes
    extends Optional<
        BoardAttributes,
        "id" | "isDeleted" | "desc" | "logo"
    > { }
// Define the Board model
class Boards
    extends Model<BoardAttributes, BoardCreationAttributes>
    implements BoardAttributes {
    public id!: string;
    public name!: string;
    public desc?: string;
    public logo?: string;
    public isDeleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    public static associate() {
        Boards.belongsToMany(Institues, { through: InstitueBoards, as: "BoardsInstitues", foreignKey: 'boardId' })
        Boards.belongsToMany(Mediums, { through: BoardMediums, as: "BoardsMediums", foreignKey: 'boardId' })
        Boards.belongsToMany(Classes, { through: MediumClasses, as: "BoardsClasses", foreignKey: 'boardId' })
        Boards.belongsToMany(Standards, { through: ClassStandards, as: "BoardsStandards", foreignKey: 'boardId' })
        Boards.belongsToMany(Subjects, { through: StandardSubjects, as: "BoardsSubjects", foreignKey: 'boardId' })
    }
}
Boards.init(
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
        modelName: "Boards",
        indexes: [
            {
                fields: ["name"],
                unique: true,
            },
        ],
    }
);

const syncBoardTable = async () => {
    try {
        await Boards.sync({ alter: false }); // Syncs the Board model
        console.log("Board model synced successfully.");
    } catch (error) {
        console.error("Error syncing Board model:", error);
    }
};

export { Boards, syncBoardTable };
