import { sequelizeConfig } from "@db";
import { UserRoles } from "@models";
import { DataTypes, Model, Optional } from "sequelize";

interface RoleAttributes {
  id?: string;
  name: string;
  roleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id" | "createdAt" | "updatedAt"> {}

class Roles
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: string;
  public name!: string;
  public roleId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    this.hasMany(UserRoles, { foreignKey: "roleId", as: "roleUserRoles" });
  }
}

Roles.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "Roles",
  }
);

const syncRolesTable = async () => {
  try {
    await Roles.sync({ alter: true }); // Syncs the Roles model
    console.log("Logs model synced successfully.");
  } catch (error) {
    console.error("Error syncing Logs model:", error);
  }
};

export { Roles, syncRolesTable };
