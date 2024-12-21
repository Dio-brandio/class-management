import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConfig } from "@db";

// Define an interface for the SecurityToken attributes
interface SecurityTokenAttributes {
  id?: string;
  userId: string;
  email?: string;
  phoneNumber?: string;
  expiresAt: Date;
  verified: boolean;
  otp: string;
  jwtToken?: string; // Optional field
  createdAt?: Date;
  updatedAt?: Date;
  securityTokenId?: number;
}

// Define an interface for the attributes needed during SecurityToken creation
interface SecurityTokenCreationAttributes
  extends Optional<
    SecurityTokenAttributes,
    | "id"
    | "jwtToken"
    | "createdAt"
    | "updatedAt"
    | "expiresAt"
    | "phoneNumber"
    | "email"
  > {}

// Define the SecurityTokens model class
class SecurityTokens
  extends Model<SecurityTokenAttributes, SecurityTokenCreationAttributes>
  implements SecurityTokenAttributes
{
  public id?: string;
  public userId!: string;
  public email?: string;
  public phoneNumber?: string;
  public expiresAt!: Date;
  public verified!: boolean;
  public otp!: string;
  public jwtToken?: string;
  public securityTokenId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public static associate() {}
}

// Initialize the SecurityTokens model
SecurityTokens.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: () =>
        new Date(new Date().setMinutes(new Date().getMinutes() + 10)), // Expires in 10 minutes by default
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for verification status
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeConfig,
    modelName: "SecurityTokens",
  }
);

// Function to sync the SecurityTokens table
const syncSecuritytokenTable = async () => {
  try {
    await SecurityTokens.sync({ alter: true }); // Syncs the SecurityTokens table, altering if necessary
    console.log("SecurityTokens table synced successfully.");
  } catch (error) {
    console.error("Error syncing SecurityTokens table:", error);
  }
};

export { SecurityTokens, syncSecuritytokenTable };
