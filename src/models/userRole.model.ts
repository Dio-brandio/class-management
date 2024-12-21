import { sequelizeConfig } from "@db";
import { Roles, Users } from "@models";
import { Model, DataTypes, Optional } from "sequelize";

interface UserRolesAttributes {
  id?: string;
  userId: string;
  roleId: string;
  userRoleId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

interface UserRolesCreationAttributes
  extends Optional<UserRolesAttributes, "id" | "createdAt" | "updatedAt"> {}

class UserRoles
  extends Model<UserRolesAttributes, UserRolesCreationAttributes>
  implements UserRolesAttributes
{
  public userId!: string;
  public roleId!: string;
  public userRoleId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public role!: Roles;
  public static associate() {
    this.belongsTo(Users, {
      as: "user",
      foreignKey: "userId",
    });
    this.belongsTo(Roles, {
      as: "role",
      foreignKey: "roleId",
    });
  }
}

UserRoles.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Roles", key: "id" },
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
    modelName: "UserRoles",
  }
);

const syncUserRolesTable = async () => {
  try {
    await UserRoles.sync({ alter: true }); // Syncs the UserRoles model
    console.log("Logs model synced successfully.");
  } catch (error) {
    console.error("Error syncing Logs model:", error);
  }
};

export { UserRoles, syncUserRolesTable };
