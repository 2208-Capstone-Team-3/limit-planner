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
  // allDay: boolean;
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
  start: {
    type: DATE,
    allowNull: false,
  },
  // allDay:{
  //   type: BOOLEAN,
  //   defaultValue: true
  // }
});

export default Event;
