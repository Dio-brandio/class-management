import { sequelizeConfig } from "@db";
import { Model, DataTypes, Optional } from "sequelize";

interface ModuleAttributes {
  id?: string;
  name: string;
  index: number;
  parentModuleId?: string | null; // For submodules
  createdAt?: Date;
  moduleId?: number;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

interface ModuleCreationAttributes
  extends Optional<
    ModuleAttributes,
    "id" | "parentModuleId" | "createdAt" | "updatedAt"
  > {}

class Modules
  extends Model<ModuleAttributes, ModuleCreationAttributes>
  implements ModuleAttributes
{
  public id!: string;
  public name!: string;
  public index!: number;
  public parentModuleId?: string;
  public moduleId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.hasMany(Modules, {
      as: "subModules",
      foreignKey: "parentModuleId",
    });
    this.belongsTo(Modules, { as: "parent", foreignKey: "parentModuleId" });
  }
}

Modules.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    parentModuleId: {
      type: DataTypes.UUID,
      allowNull: true, // NULL if it's a main module, not a submodule
      references: { model: "Modules", key: "id" },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets the creation date
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets the update date
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "Modules",
  }
);

const syncModulesTable = async () => {
  try {
    await Modules.sync({ alter: true }); // Syncs the Modules model
    console.log("Logs model synced successfully.");
  } catch (error) {
    console.error("Error syncing Logs model:", error);
  }
};

export { Modules, syncModulesTable };
