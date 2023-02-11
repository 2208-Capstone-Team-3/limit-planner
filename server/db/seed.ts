import { VIRTUAL } from "sequelize";
import db from "./db.js";
import { Account, Entry, Goal, User, Skipdate } from "./index.js";
// import Chance from "chance";
// const chance = new Chance();

const entryData = [
  {
    entryType: "User",
    amount: 20000,
    creditDebit: "Credit",
    title: "Bi-Weekly Paycheck",
    note: "Got paid today!",
    start: new Date("2023-01-13"),
    allDay: true,
    frequency:'Bi-Weekly'
  },
  { 
    entryType: "User",
    amount: 60000,
    creditDebit: "Debit",
    title: "Monthly Electricity Bill",
    note: "Paid ConEd",
    start: new Date("2023-01-24"),
    allDay: true,
    frequency:'Monthly'
  },
  { 
    entryType: "API",
    amount: 70000,
    creditDebit: "Debit",
    title: "Weekly Grocery Shopping",
    note: "Bought groceries",
    start: new Date("2023-01-01"),
    allDay: true,
    frequency:'Weekly'
  },
  { 
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "Daily coffee",
    note: "Bought coffee",
    start: new Date("2023-01-15"),
    allDay: true,
    frequency:'ByDate'
  },
  { 
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "tuition",
    note: "Bought coffee",
    start: new Date("2023-02-08"),
    allDay: true,
    frequency:'Weekly'
  },
  { 
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "mortgage",
    note: "Bought coffee",
    start: new Date("2023-02-09"),
    allDay: true,
    frequency:'Weekly'
  },
  { 
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "some other thing",
    note: "Bought coffee",
    start: new Date("2023-02-10"),
    allDay: true,
    frequency:'Weekly'
  },
  { 
    entryType: "API",
    amount: 30000,
    creditDebit: "Debit",
    title: "weekly activity thing",
    note: "Bought coffee",
    start: new Date("2023-02-12"),
    allDay: true,
    frequency:'Weekly'
  }
];

const goalData = [
  {
    name: "Buy icecream",
    goalAmount: 7000,
    startAmount: 20,
    startDate: new Date("2022-11-05"),
    endDate: new Date("2023-01-04"),
    victory: false,
  },
  {
    name: "Buy a car",
    goalAmount: 15000,
    startAmount: 2,
    startDate: new Date("2022-10-05"),
    endDate: new Date("2023-04-07"),
    victory: false,
  },
  {
    name: "Retirement",
    goalAmount: 100000000,
    startAmount: 7000,
    startDate: new Date("2022-06-05"),
    endDate: new Date("2023-09-12"),
    victory: true,
  },
  {
    name: "Buy coffin for self",
    goalAmount: 4600454,
    startAmount: 25891,
    startDate: new Date("2022-06-05"),
    endDate: new Date("2023-09-12"),
    victory: true,
  },
  {
    name: "Buy coffin for self",
    goalAmount: 4600454,
    startAmount: 25891,
    startDate: new Date("2022-06-05"),
    endDate: new Date("2023-09-12"),
    victory: true,
  },
];
const userData = [
  {
    password: "123",
    username: "coolguy6969",
    firstName: "Pam",
    lastName: "Pamerson",
    fullName: new VIRTUAL(),
    phoneNum: "58358349538",
    email: "strongperson@gmail.com",
    address: "123 Place Ave, Asheville, NC",
    birthday: new Date("051299"),
    avatarUrl: null,
    isAdmin: false,
  },
  {
    password: "123",
    username: "icantmoney",
    firstName: "Dave",
    lastName: "Davidson",
    fullName: new VIRTUAL(),
    phoneNum: "1535186538",
    email: "pizza@gmail.com",
    address: "123 Place Ave, Asheville, NC",
    birthday: new Date("070589"),
    avatarUrl: null,
    isAdmin: false,
  },
  {
    password: "123",
    username: "notjeff",
    firstName: "Jeff",
    lastName: "Jefferson",
    fullName: new VIRTUAL(),
    phoneNum: "9549351325",
    email: "buttman@gmail.com",
    address: "123 Place Ave, Asheville, NC",
    birthday: new Date("031895"),
    avatarUrl: null,
    isAdmin: false,
  },
  {
    password: "123",
    username: "sailormoon",
    firstName: "Kolby",
    lastName: "Wolf",
    fullName: new VIRTUAL(),
    phoneNum: "9846531258",
    email: "alsobuttman@gmail.com",
    address: "123 Place Ave, Asheville, NC",
    birthday: new Date("040404"),
    avatarUrl: null,
    isAdmin: true,
  },
];
const accountData = [
  {
    accountType: "checking",
    accountName: "My Checking",
    institution: "Chase",
    balance: 1050.0,
  },
  {
    accountType: "savings",
    accountName: "Rainy Day Fund",
    institution: "Wells Fargo",
    balance: 10500.0,
  },
  {
    accountType: "internal",
    accountName: "My internal account",
    institution: "Citizens",
    balance: 2500.0,
  },
  {
    accountType: "checking",
    accountName: "HSBC Checking account",
    institution: "HSBC",
    balance: 6000.0,
  },
];

const skipDatesEntry = [
  {
    skippeddate: new Date("2023-01-01")
  }
]

const seed = async () => {
  await db.sync({ force: true });
  try {
    // --------------USERS--------------

    console.log("adding users");
    const [userOne, userTwo, userThree, userFour] = await Promise.all(
      userData.map((user) => User.create(user))
    );

    // --------------ACCOUNTS--------------

    console.log("adding accounts");
    const [accountOne, accountTwo, accountThree, accountFour] =
      await Promise.all(accountData.map((account) => Account.create(account)));

    // --------------ENTRIES--------------

    console.log("adding entries");
    const [entryOne, entryTwo, entryThree, entryFour, entryFive] =
      await Promise.all(entryData.map((entry) => Entry.create(entry)));

    // -------------SKIPDATES---------------
    console.log("adding skip dates")
    const skipOne = await Skipdate.create(skipDatesEntry[0]);

    // let i = 0;
    // // const entryList = [];
    // while (i++ < 500) {
    //   const newEntry = await Entry.create({
    //     entryType: chance.pickone(["User", "API"]),
    //     start: new Date(chance.date({ year: 2023 })),
    //     creditDebit: chance.pickone(["Credit", "Debit"]),
    //     amount: chance.integer({ min: 0, max: 5000 }),
    //     title: chance.word(),
    //     note: chance.sentence(),
    //     allDay:true,
    //     frequency: "ByDate",
    //   });
    //   accountFour.addEntry(newEntry);
    // }

    // --------------GOALS--------------

    console.log("adding goals");

    const [goalOne, goalTwo, goalThree, goalFour, goalFive] = await Promise.all(
      goalData.map((goal) => Goal.create(goal))
    );

    // --------------EVENTS--------------

    // console.log("adding events");

    // --------------ASSOCIATIONS--------------

    // User.hasMany(Account)
    // Account.belongsTo(User)
    userOne.addAccount(accountOne);
    userTwo.addAccount(accountTwo);
    userThree.addAccount(accountThree);
    userFour.addAccount(accountFour);

    // Account.hasMany(Entry);
    // Entry.belongsTo(Account);

    accountOne.addEntry(entryOne);
    accountTwo.addEntry(entryTwo);
    accountThree.addEntry(entryThree);
    accountFour.addEntry(entryFour);
    accountFour.addEntry(entryFive);
    accountFour.addEntry(entryThree);

    // Account.hasMany(Goal);
    // Goal.belongsTo(Account);
    accountOne.addGoal(goalFour);
    accountTwo.addGoal(goalThree);
    accountTwo.addGoal(goalTwo);
    accountThree.addGoal(goalOne);
    accountFour.addGoal(goalFive);

    //Entry.hasMany(SkipDates)
    //SkipDates.belongsTo(Entry)
    entryThree.addSkipdate(skipOne)
    accountThree.addSkipdate(skipOne)
    userThree.addSkipdate(skipOne)
  
    
  } catch (err) {
    console.log("error");
    console.log(err);
  };
};

seed();
