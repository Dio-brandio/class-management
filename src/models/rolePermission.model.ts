import { sequelizeConfig } from "@db";
import { Model, DataTypes, Optional } from "sequelize";

interface Permissions {
  [key: string]: boolean; // Index signature to allow dynamic keys
}

interface RolePermissionsAttributes {
  id?: string;
  userId: string;
  roleId: string;
  moduleIndex: number;
  permissions: Permissions;
  createdAt?: Date;
  updatedAt?: Date;
  rolePermissionId?: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

interface RolePermissionsCreationAttributes
  extends Optional<
    RolePermissionsAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

class RolePermissions
  extends Model<RolePermissionsAttributes, RolePermissionsCreationAttributes>
  implements RolePermissionsAttributes
{
  public userId!: string;
  public roleId!: string;
  public moduleIndex!: number;
  public permissions!: Permissions;
  public rolePermissionId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public static associate() {}
}

RolePermissions.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rolePermissionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Roles", key: "id" },
    },
    moduleIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Modules", key: "index" },
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        read: false,
        write: false,
      },
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
    modelName: "RolePermissions",
  }
);

const syncRolePermissionsTable = async () => {
  try {
    await RolePermissions.sync({ alter: true }); // Syncs the RolePermissions model
    console.log("Logs model synced successfully.");
  } catch (error) {
    console.error("Error syncing Logs model:", error);
  }
};

export { RolePermissions, syncRolePermissionsTable };
