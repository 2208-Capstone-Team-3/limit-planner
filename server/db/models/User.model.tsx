import db from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Model, DataType } from "sequelize-typescript";

declare class UserModel extends Model {
  declare id: string;
  declare password: string;
  declare username: string;
  declare firstName: string;
  declare lastName: string;
  declare fullName: string;
  declare phoneNum: number;
  declare email: string;
  declare birthday: Date;
  declare avatarUrl: string;
  declare isAdmin: boolean;
}

const User = db.define<UserModel>("user", {
  id: {
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  },
  username: {
    type: DataType.STRING,
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
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: DataType.VIRTUAL,
    validate: {
      notEmpty: true,
    },
    get() {
      return `${this.getDataValue("firstName")} ${this.getDataValue(
        "lastName"
      )}`;
    },
  },
  phoneNum: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  birthday: {
    type: DataType.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
  },
  avatarUrl: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: "/public/logo.svg",
  },
  isAdmin: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
});

User.addHook("beforeSave", async (user: UserModel) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.findByToken = async function (token: string) {
  try {
    const id = jwt.verify(token, "secret");
    const user = await this.findByPk(id);
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
  return jwt.sign({ id: this.id }, "secret");
};

User.prototype.authenticate = async function (userAuth: {
  username: string;
  password: string;
}) {
  const { username, password } = userAuth;
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, "secret");
  }
  const error = new Error("bad credentials");
  error.message = "401";
  throw error;
};

export default User;
