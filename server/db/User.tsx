import db from "./db";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import {
  AbstractDataTypeConstructor,
  BOOLEAN,
  DATE,
  DateDataType,
  InferAttributes,
  InferCreationAttributes,
  Model,
  STRING,
  UUID,
  UUIDV4,
  VIRTUAL,
  VirtualDataType,
} from "sequelize";
// const JWT = process.env.JWT;

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: string;
  declare password: string;
  declare username: string;
  declare firstName: string;
  declare lastName: string;
  declare fullName: VirtualDataType<AbstractDataTypeConstructor>;
  declare phoneNum: number;
  declare email: string;
  declare birthday: DateDataType;
  declare avatarUrl: string;
  declare isAdmin: boolean;
  declare findByToken: AbstractDataTypeConstructor;
}

const User = db.define<UserModel>("user", {
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
      const username = this.getDataValue("username");
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
    get() {
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

User.addHook("beforeSave", async (user: UserModel) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

// User.findByToken = async function (token: string) {
//   try {
//     const { id } = jwt.verify(token, JWT);
//     const user = await this.findByPk(id);
//     if (user) {
//       return user;
//     } else {
//       const error = new Error("user not found");
//       throw error;
//     }
//   } catch (ex) {
//     console.log(ex);
//     const error = new Error("bad credentials");
//     error.message = "401";
//     throw error;
//   }
// };

// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, JWT);
// };

// User.authenticate = async function ({ username, password }) {
//   const user = await this.findOne({
//     where: {
//       username,
//     },
//   });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return jwt.sign({ id: user.id }, JWT);
//   }
//   const error = new Error("bad credentials");
//   error.message = "401";
//   throw error;
// };

export default User;
