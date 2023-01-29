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
  start: string;
  end: string;
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
  start: {
    type: STRING,
    allowNull: false,
  },
  end: {
    type: STRING,
    allowNull: false,
  }
});

export default Event;
