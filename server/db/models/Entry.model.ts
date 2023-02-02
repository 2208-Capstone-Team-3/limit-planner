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
  INTEGER,
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface EntryAttributes
  extends Model<
    InferAttributes<EntryAttributes>,
    InferCreationAttributes<EntryAttributes>
  > {
  id?: string;
  entryType: string;
  start: Date;
  allDay: boolean;
  creditDebit: string;
  amount: number;
  //groupId?:string;
  title: string;
  // daysOfWeek?:number[];
  
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
  allDay: {
    type: BOOLEAN
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
  // groupId: {
  //   type: STRING,
  //   allowNull: true
  // },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // daysOfWeek:{
  //   type:ARRAY(INTEGER),
  //   allowNull:true
  // },
  
});

export default Entry;
