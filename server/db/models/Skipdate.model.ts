import db from "../db.js";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  DATE,
} from "sequelize";

// order of InferAttributes & InferCreationAttributes is important.
export interface SkipDateAttributes
  extends Model<
    InferAttributes<SkipDateAttributes>,
    InferCreationAttributes<SkipDateAttributes>
  > {
  id?: string;
  skippeddate: Date;
  userId?: string 
  entryId?: string
  createdAt?: string | undefined,
  updatedAt?: string | undefined,
}

const Skipdate = db.define<SkipDateAttributes>("skipdate", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  skippeddate: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Skipdate;
