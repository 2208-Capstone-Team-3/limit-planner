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
  ENUM,
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
  note:string;
  start: Date;
  allDay: boolean;
  frequency:string
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
    allowNull: false,
  },
  // one-time event fields
  start: {
    type: DATE,
    allowNull: false,
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

export default Event;
