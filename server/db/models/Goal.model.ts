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
export interface GoalAttributes
  extends Model<
    InferAttributes<GoalAttributes>,
    InferCreationAttributes<GoalAttributes>
  > {
  id: string;
  name:string;
  goalAmount: string;
  startAmount: string;
  startDate: string;
  endDate: number;
  victory:boolean;
};

const Goal = db.define<GoalAttributes>("goal", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name:{
    type: STRING,
    allowNull:false,
    validate:{
        isEmpty:false
    }
  },
  goalAmount: {
    type: FLOAT,
    allowNull: false,
  },
  startAmount: {
    type: FLOAT,
    allowNull: false,
  },
  startDate: {
    type: DATE,
    allowNull: false,
  },
  endDate: {
    type: DATE,
    allowNull: false,
  },
  victory:{
    type: BOOLEAN,
    allowNull:false,
  }
});

export default Goal;
