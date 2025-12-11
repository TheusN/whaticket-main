import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Whitelabels", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: { model: "Companies", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
        unique: true // Apenas 1 whitelabel por empresa
      },
      companyName: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      logoLight: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      logoDark: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      favicon: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      loginBanner: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      loginLogo: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      primaryColorLight: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#8B5CF6"
      },
      secondaryColorLight: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#F3F4F6"
      },
      backgroundColorLight: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#FFFFFF"
      },
      textColorLight: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#1F2937"
      },
      primaryColorDark: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#8B5CF6"
      },
      secondaryColorDark: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#1F2937"
      },
      backgroundColorDark: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#111827"
      },
      textColorDark: {
        type: DataTypes.STRING(7),
        allowNull: true,
        defaultValue: "#F9FAFB"
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Whitelabels");
  }
};
