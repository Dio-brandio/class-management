import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "@db";

// Define an interface for the Log attributes
interface LogsAttributes {
  id?: string;
  request: string;
  response: string;
  functionName: string;
  isSuccess: boolean;
  userId?: number | null; // Optional field
  timeStamp?: Date;
  logId?: number;
  errorMessage?: string | null;
  ip?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

// Define an interface for the attributes needed during Logs creation
interface LogsCreationAttributes
  extends Optional<LogsAttributes, "timeStamp" | "errorMessage" | "ip"> {}

// Define the Logs model class
class Logs
  extends Model<LogsAttributes, LogsCreationAttributes>
  implements LogsAttributes
{
  id?: string;
  public request!: string;
  public response!: string;
  public functionName!: string;
  public isSuccess!: boolean;
  public userId?: number | null;
  public timeStamp!: Date;
  public errorMessage?: string | null;
  public logId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public static associate() {}
}

Logs.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    isSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "Logs",
    indexes: [
      {
        unique: false,
        fields: ["userId"],
      },
    ],
  }
);

const syncLogsTable = async () => {
  try {
    await Logs.sync({ alter: true }); // Syncs the Logs model
    console.log("Logs model synced successfully.");
  } catch (error) {
    console.error("Error syncing Logs model:", error);
  }
};

export { Logs, syncLogsTable };
