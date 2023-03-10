import db from "../db.js";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
  STRING,
  BOOLEAN,
  VIRTUAL,
  DATE,
  AbstractDataType,
  Identifier,
} from "sequelize";
import { AccountAttributes } from "./Account.model.js";
import { EntryAttributes } from "./Entry.model.js";
import { PlaceType } from "../../../src/Components/UserCreation/UserGoogleLocation.js";
import { JWT } from "../../api/helpers/superSecret.js";
import { SkipDateAttributes } from "./Skipdate.model.js";
import { GoalAttributes } from "./Goal.model.js";

export interface UserAttributes
  extends Model<
    InferAttributes<UserAttributes>,
    InferCreationAttributes<UserAttributes>
  > {
  addGoal(goal: GoalAttributes): unknown;
  accounts?: [];
  goals?: [];
  addEntry(entry: EntryAttributes): unknown
  addAccount(account: AccountAttributes): unknown;
  addSkipdate(skipdate: SkipDateAttributes): unknown;
  id?: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName?: AbstractDataType;
  phoneNum: string;
  email: string;
  birthday: Date;
  address: PlaceType | string;
  avatarUrl: string | null;
  isAdmin: boolean;
}

const User = db.define<UserAttributes>("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
    set(usernameInput: string) {
      this.setDataValue("username", usernameInput.toLowerCase());
    },
    get() {
      const username: string = this.getDataValue("username");
      const usernameArr = username.split("");
      usernameArr[0] = usernameArr[0].toUpperCase();
      return usernameArr.join("");
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: VIRTUAL,
    validate: {
      notEmpty: true,
    },
    get(): string {
      return `${this.getDataValue("firstName")} ${this.getDataValue(
        "lastName"
      )}`;
    },
  },
  phoneNum: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  birthday: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatarUrl: {
    type: STRING,
    allowNull: true,
    defaultValue: "/public/logo.svg",
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

User.addHook("beforeSave", async (user: UserAttributes) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.findByToken = async function (token: string) {
  try {
    const tokenId: JwtPayload = jwt.verify(token, JWT, {
      complete: true,
    });
    const id: Identifier = tokenId.payload.id;
    const user = await User.findByPk(id);
    if (user) {
      return user;
    } else {
      const error = new Error("user not found");
      throw error;
    }
  } catch (ex) {
    console.log(ex);
    const error = new Error("bad credentials");
    error.message = "401";
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.prototype.authenticate = async function (userAuth: {
  username: string;
  password: string;
}) {
  const { username, password } = userAuth;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.message = "401";
  throw error;
};

export default User;
