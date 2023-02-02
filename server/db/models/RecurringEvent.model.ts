import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  FLOAT,
  NUMBER,
  DATE,
  BOOLEAN,
  ARRAY,
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface RecurringEventAttributes
  extends Model<
    InferAttributes<RecurringEventAttributes>,
    InferCreationAttributes<RecurringEventAttributes>
  > {
  id?: string;
  title: string;
  groupId:string;
  daysOfWeek:string[];
}

const RecurringEvent = db.define<RecurringEventAttributes>("recurringEvent", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  groupId: {
    type: STRING,
    allowNull: false,
  },
  daysOfWeek:{
    type:ARRAY(STRING),
    allowNull:false
  }
});

export default RecurringEvent;
