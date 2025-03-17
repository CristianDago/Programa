import { Sequelize } from "sequelize-typescript";
import { Student, User } from "./schema";

const DATABASE_USER = process.env.CONNECT_DG_USERS;
const DATABASE_STUDENT = process.env.CONNECT_DG_STUDENTS; 

if(!DATABASE_USER) {
  throw new Error("DaTABASE_URL not found"); 
}

export const sequelizeUser = new Sequelize(DATABASE_USER, {
  dialect: "postgres",
  models: [User],
  logging: false,
});


if(!DATABASE_STUDENT) {
  throw new Error("DaTABASE_URL not found"); 
}

export const sequelizeStudent = new Sequelize(DATABASE_STUDENT, {
  dialect: "postgres",
  models: [Student],
  logging: false,
});
