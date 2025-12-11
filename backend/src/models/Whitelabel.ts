import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType
} from "sequelize-typescript";
import Company from "./Company";

@Table
class Whitelabel extends Model<Whitelabel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  // BRANDING
  @Column(DataType.TEXT)
  companyName: string;

  // LOGOS E IMAGENS (armazenar URLs após upload)
  @Column(DataType.TEXT)
  logoLight: string; // URL do logo modo claro

  @Column(DataType.TEXT)
  logoDark: string; // URL do logo modo escuro

  @Column(DataType.TEXT)
  favicon: string; // URL do favicon

  @Column(DataType.TEXT)
  loginBanner: string; // URL do banner de login

  @Column(DataType.TEXT)
  loginLogo: string; // URL do logo centralizado no login

  // CORES - MODO CLARO
  @Column(DataType.STRING(7))
  primaryColorLight: string; // Ex: #8B5CF6

  @Column(DataType.STRING(7))
  secondaryColorLight: string;

  @Column(DataType.STRING(7))
  backgroundColorLight: string;

  @Column(DataType.STRING(7))
  textColorLight: string;

  // CORES - MODO ESCURO
  @Column(DataType.STRING(7))
  primaryColorDark: string;

  @Column(DataType.STRING(7))
  secondaryColorDark: string;

  @Column(DataType.STRING(7))
  backgroundColorDark: string;

  @Column(DataType.STRING(7))
  textColorDark: string;

  // STATUS
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  active: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default Whitelabel;
