import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import moment from "moment-timezone";

@Table
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare role: string;
}

@Table
export class Student extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare lastname: string;

    @Column(DataType.STRING)
    declare rut?: string;

    @Column(DataType.DATE)
    declare birthdate?: Date;

    @Column(DataType.STRING)
    declare sex?: string;

    @Column(DataType.TEXT)
    declare address?: string;

    @Column(DataType.STRING)
    declare nationality?: string;

    @Column(DataType.STRING)
    declare source?: string;

    @Column(DataType.TEXT)
    declare contact?: string;
    
    @AllowNull(true)
    @Column(DataType.STRING)
    declare phone?: string | null;

    @Column(DataType.DATE)
    declare contactDate?: Date;

    @Column(DataType.STRING)
    declare call1?: string;

    @Column(DataType.STRING)
    declare call2?: string;

    @Column(DataType.STRING)
    declare call3?: string;

    @Column(DataType.STRING)
    declare comments1?: string;

    @Column(DataType.STRING)
    declare comments2?: string;

    @Column(DataType.STRING)
    declare comments3?: string;

    @Column(DataType.STRING)
    declare positiveFeedback?: string;

    @Column(DataType.TEXT)
    declare linkDni?: string;

    @Column(DataType.TEXT)
    declare birthCertificate?: string;

    @Column(DataType.TEXT)
    declare studyCertificate?: string;

    @Column(DataType.TEXT)
    declare studentImage?: string;

    @Column(DataType.STRING)
    declare school?: string;

    @Column(DataType.STRING)
    declare course?: string;

    @Column(DataType.STRING)
    declare communicationPreference?: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    declare createdAt?: Date;

    @BeforeCreate
    @BeforeUpdate
    static adjustDates(instance: Student) {
        const adjustDateToChileTimezone = (date: Date) => {
            return moment(date).tz("America/Santiago").toDate();
        };

        if (instance.birthdate) {
            instance.birthdate = adjustDateToChileTimezone(instance.birthdate);
        }

        if (instance.contactDate) {
            instance.contactDate = adjustDateToChileTimezone(instance.contactDate);
        }
    }
}