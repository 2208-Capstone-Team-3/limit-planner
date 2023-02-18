import { VIRTUAL } from "sequelize";
import db from "./db.js";
import { Account, Entry, Goal, User, Skipdate } from "./index.js";
import Chance from "chance";
// const chance = new Chance();

const entryData = [
  {
    entryType: "User",
    amount: 2000.0,
    creditDebit: "Credit",
    title: "Bi-Weekly Paycheck",
    note: "Got paid today!",
    start: new Date("2023-01-13"),
    allDay: true,
    frequency: "Bi-Weekly",
  },
  {
    entryType: "User",
    amount: 100.0,
    creditDebit: "Debit",
    title: "Monthly Electricity Bill",
    note: "Paid ConEd",
    start: new Date("2023-01-24"),
    allDay: true,
    frequency: "Monthly",
  },
  {
    entryType: "API",
    amount: 150.0,
    creditDebit: "Debit",
    title: "Weekly Grocery Shopping",
    note: "Bought groceries",
    start: new Date("2023-01-01"),
    allDay: true,
    frequency: "Weekly",
  },
  {
    entryType: "API",
    amount: 1.0,
    creditDebit: "Debit",
    title: "Daily coffee",
    note: "Bought coffee",
    start: new Date("2023-01-15"),
    allDay: true,
    frequency: "ByDate",
  },

  {
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "mortgage",
    note: "Bought coffee",
    start: new Date("2023-02-09"),
    allDay: true,
    frequency: "Weekly",
  },
  {
    entryType: "API",
    amount: 1000.0,
    creditDebit: "Debit",
    title: "rent",
    note: "paid rent",
    start: new Date("2023-02-01"),
    allDay: true,
    frequency: "Monthly",
  },
  {
    entryType: "API",
    amount: 400.0,
    creditDebit: "Debit",
    title: "savings",
    note: "moved money into savings account",
    start: new Date("2023-02-15"),
    allDay: true,
    frequency: "Monthly",
  },
  {
    entryType: "API",
    amount: 400.0,
    creditDebit: "Credit",
    title: "savings",
    note: "moved money into savings account",
    start: new Date("2023-02-15"),
    allDay: true,
    frequency: "Monthly",
  },
];

const goalData = [

  {
    name: "Buy a car",
    goalAmount: 15000,
    // startAmount: 2,
    // startDate: new Date("2022-10-05"),
    endDate: new Date("2023-05-07"),
    victory: false,
  },
  {
    name: "Retirement",
    goalAmount: 100000000,
    // startAmount: 7000,
    // startDate: new Date("2022-06-05"),
    endDate: new Date("2023-09-12"),
    victory: true,
  },

];
const userData = [
  {
    password: "123",
    username: "guest",
    firstName: "Pam",
    lastName: "Pamerson",
    fullName: new VIRTUAL(),
    phoneNum: "58358349538",
    email: "guestperson@gmail.com",
    address: "123 Place Ave, Asheville, NC",
    birthday: new Date("051299"),
    avatarUrl: null,
    isAdmin: false,
  },
  
];
const accountData = [
  {
    accountType: "checking",
    accountName: "HSBC Checking account",
    institution: "HSBC",
    balance: 6000.0,
  },
  {
    accountType: "savings",
    accountName: "HSBC Savings account",
    institution: "HSBC",
    balance: 60000.0,
  },
];

const skipDatesEntry = [
  {
    skippeddate: new Date("2023-01-01"),
  },
];

const seed = async () => {
  await db.sync({ force: true });
  try {
    // --------------USERS--------------

    console.log("adding users");
    const [userOne] = await Promise.all(
      userData.map((user) => User.create(user))
    );

    // --------------ACCOUNTS--------------

    console.log("adding accounts");
    const [accountOne, accountTwo] =
      await Promise.all(accountData.map((account) => Account.create(account)));

    // --------------ENTRIES--------------

    console.log("adding entries");
    const [entryOne, entryTwo, entryThree, entryFour, entryFive, entrySix, entrySeven, entryEight] =
      await Promise.all(entryData.map((entry) => Entry.create(entry)));

    // -------------SKIPDATES---------------
    console.log("adding skip dates");
    const skipOne = await Skipdate.create(skipDatesEntry[0]);

    // let i = 0;
    // // const entryList = [];
    // while (i++ < 500) {
    //   const newEntry = await Entry.create({
    //     entryType: chance.pickone(["User", "API"]),
    //     start: new Date(chance.date({ year: 2023 })),
    //     creditDebit: chance.pickone(["Credit", "Debit"]),
    //     amount: chance.integer({ min: 0, max: 5000 }),
    //     allDay: true,
    //     title: chance.word(),
    //     note: chance.sentence(),
    //     frequency: "ByDate",
    //   });
    //   accountFour.addEntry(newEntry);
    // }

    // --------------GOALS--------------

    console.log("adding goals");
    const [goalOne, goalTwo] = await Promise.all(
      goalData.map((goal) => Goal.create(goal))
    );

    // --------------ASSOCIATIONS--------------

    // User.hasMany(Account)
    // Account.belongsTo(User)
    userOne.addAccount(accountOne);
    userOne.addAccount(accountTwo);


    // Account.hasMany(Entry);
    // Entry.belongsTo(Account);
    accountOne.addEntry(entryOne);
    accountOne.addEntry(entryTwo);
    accountOne.addEntry(entryThree);
    accountOne.addEntry(entryFour);
    accountOne.addEntry(entryFive);
    accountOne.addEntry(entrySix);
    accountOne.addEntry(entrySeven);
    accountTwo.addEntry(entryEight);
 
    // Account.hasMany(Goal);
    // Goal.belongsTo(Account);
    accountOne.addGoal(goalOne);
    accountTwo.addGoal(goalTwo);
  

    //Entry.hasMany(SkipDates)
    //SkipDates.belongsTo(Entry)
    entryThree.addSkipdate(skipOne);
    accountOne.addSkipdate(skipOne);
    userOne.addSkipdate(skipOne);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

seed();
