import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  ARRAY,
  FLOAT,
  DATE,
  ENUM,
  BOOLEAN,
  INTEGER
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface EntryAttributes
  extends Model<
    InferAttributes<EntryAttributes>,
    InferCreationAttributes<EntryAttributes>
  > {
    id?: string;
    entryType: string;
    amount: number;
    creditDebit: string
    title: string;
    note:string;
    start: Date | string;
    allDay: boolean;
    frequency:string
}

const Entry = db.define<EntryAttributes>("entry", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  entryType: {
    type: ENUM,
    values: ["API", "User"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  start: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  creditDebit: {
    type: ENUM,
    values: ["Credit", "Debit"],
    validate: {
      notEmpty: true,
    },
  },
  amount: {
    type: FLOAT,
    defaultValue: 0.0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  note: {
    type: STRING,
  },
  allDay:{
    type: BOOLEAN,
    defaultValue: true,
    allowNull:false
  },
  frequency:{
    type: ENUM,
    values:['ByDate','Weekly','Bi-Weekly','Monthly'],
    allowNull:false
  }
});

export default Entry;
