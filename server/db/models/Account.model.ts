import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  FLOAT,
  ENUM,
} from "sequelize";
import { EntryAttributes } from "./Entry.model.js";
import { GoalAttributes } from "./Goal.model.js";
import { SkipDateAttributes } from "./Skipdate.model.js";

// order of InferAttributes & InferCreationAttributes is important.
export interface AccountAttributes
  extends Model<
    InferAttributes<AccountAttributes>,
    InferCreationAttributes<AccountAttributes>
  > {
  addGoal(goal: GoalAttributes): unknown;
  addEntry(entry: EntryAttributes): unknown;
  addSkipdate(skipdate: SkipDateAttributes): unknown;
  goals?: []
  entries?: []
  userId?: string;
  id?: string;
  accountType: string;
  accountName: string;
  institution: string;
  balance: number;
}

const Account = db.define<AccountAttributes>("account", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  accountType: {
    type: ENUM,
    values: ["checking", "savings", "internal", "goal"],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  accountName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  institution: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  balance: {
    type: FLOAT,
    defaultValue: 0.0,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Account;
