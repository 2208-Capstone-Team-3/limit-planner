// import db from ".";
import User from "./models/User.model.js";
import Account from "./models/Account.model.js";
import Entry from "./models/Entry.model.js";
import Goal from "./models/Goal.model.js";
import Event from "./models/Event.model.js";
import RecurringEvent from "./models/RecurringEvent.model.js";

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

export { Account, User, Goal, Entry, Event, RecurringEvent };
