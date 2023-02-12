// import db from ".";
import User from "./models/User.model.js";
import Account from "./models/Account.model.js";
import Entry from "./models/Entry.model.js";
import Goal from "./models/Goal.model.js";
import Skipdate from "./models/Skipdate.model.js"

User.hasMany(Account);
Account.belongsTo(User);

User.hasMany(Entry);
Entry.belongsTo(User);

User.hasMany(Goal);
Goal.belongsTo(User);

Account.hasMany(Entry);
Entry.belongsTo(Account);

Account.hasMany(Goal);
Goal.belongsTo(Account);

Entry.hasMany(Skipdate)
Skipdate.belongsTo(Entry)

Account.hasMany(Skipdate)
Skipdate.belongsTo(Account)

User.hasMany(Skipdate)
Skipdate.belongsTo(User)

export { Account, User, Goal, Entry, Skipdate };
