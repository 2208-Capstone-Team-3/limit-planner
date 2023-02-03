import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  FLOAT,
  ARRAY,
  DATE,
  BOOLEAN,
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface EventAttributes
  extends Model<
    InferAttributes<EventAttributes>,
    InferCreationAttributes<EventAttributes>
  > {
  id?: string;
  title: string;
  note?:string;
  start?: Date;
  allDay?: boolean;
  groupId?:string;
  daysOfWeek?:string[];
}

const Event = db.define<EventAttributes>("event", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  note: {
    type: STRING,
    allowNull: true,
  },
  // one-time event fields
  start: {
    type: DATE,
    allowNull: true,
  },
  allDay:{
    type: BOOLEAN,
    defaultValue: true,
    allowNull:true
  },
  // recurring even fields
  groupId: {
    type: STRING,
    allowNull: true,
    defaultValue: UUIDV4
  },
  daysOfWeek:{
    type:ARRAY(STRING),
    allowNull:true
  }
});

export default Event;
