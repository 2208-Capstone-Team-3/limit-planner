import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  FLOAT,
  DATE,
  ENUM,
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface EntryAttributes
  extends Model<
    InferAttributes<EntryAttributes>,
    InferCreationAttributes<EntryAttributes>
  > {
  id?: string;
  entryType: string;
  date: Date;
  creditDebit: string;
  amount: number;
  title: string;
  note: string;
  frequency: string;
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
  date: {
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
    validate: {
      notEmpty: true,
    },
  },
  note: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  frequency: {
    type: ENUM,
    values: ["Weekly", "Biweekly", "Monthly", "ByDate"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Entry;
