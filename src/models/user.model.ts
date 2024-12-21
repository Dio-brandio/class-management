import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "../db/sequelize";
import { hashPassword } from "@libs";
import { UserRoles } from "@models";

interface UserAttributes {
  id?: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  lastSeen: Date;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastJwtToken: string;
  userId?: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

// Define an interface for the attributes needed during user creation
interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "isDeleted" | "createdAt" | "updatedAt" | "phoneNumber" | "email"
  > {}
// Define the User model
class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email?: string;
  public phoneNumber?: string;
  public password!: string;
  public lastSeen!: Date;
  public isDeleted!: boolean;
  public userId?: number;
  public createdBy?: string;
  public updatedBy?: string;
  public deletedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public lastJwtToken!: string;

  public readonly userRoles?: UserRoles[];

  public static associate() {
    this.hasMany(UserRoles, { as: "userRoles", foreignKey: "userId" });
  }
}
Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true, // Validates the format of the email
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    lastJwtToken: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
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
    modelName: "Users",
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const hash = await hashPassword(user.password);
          user.password = hash;
        }
      },
    },
    indexes: [
      {
        fields: ["id", "email", "phoneNumber"],
        unique: true,
      },
    ],
  }
);

const syncUserTable = async () => {
  try {
    await Users.sync({ alter: false }); // Syncs the User model
    console.log("User model synced successfully.");
  } catch (error) {
    console.error("Error syncing User model:", error);
  }
};

export { Users, syncUserTable };
