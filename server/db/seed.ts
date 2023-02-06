import { VIRTUAL } from "sequelize";
import db from "./db.js";
import { Account, Entry, Goal, User, Event } from "./index.js";
import Chance from "chance";

const chance = new Chance();

const entryData = [
  {
    entryType: "API",
    //YYYY-MM-DD
    start: new Date ("2022-03-24"),
    allDay: true,
    creditDebit: "Credit",
    amount: 400,
    groupId: "Food",
    title: "I went to buy groceries at Walmart",
    note: chance.sentence(),
    frequency: "Nonrecurring",
    
  },
  {
    entryType: "API",
    start: new Date (                                                                                                                                                     "2022-04-24"),
    allDay: true,
    creditDebit: "Debit",
    amount: 500,
    groupId: "Food",
    title: "I went to buy snacks at Walmart",
    note: chance.sentence(),
    frequency: "Nonrecurring",
    
  },
  {
    entryType: "User",
    start: new Date("2022-05-24"),
    allDay: true,
    creditDebit: "Credit",
    amount: 600,
    groupId: "Drugs",
    title: "I went to buy drugs at Walmart",
    daysOfWeek: [2],
    note: chance.sentence(),
    frequency: "Nonrecurring",
  },
  {
    entryType: "User",
    start: new Date("2022-06-24"),
    allDay: true,
    creditDebit: "Debit",
    amount: 700,
    groupId: "Alcohol",
    title: "I went to buy alcohol at Walmart",
    daysOfWeek: [4, 5],
    note: chance.sentence(),
    frequency: "Nonrecurring",
  },
  {
    entryType: "User",
    start: new Date("2022-07-24"),
    allDay: true,
    creditDebit: "Debit",
    amount: 700,
    groupId: "Bribes",
    title: "I went to bribe people at Walmart",
    daysOfWeek: [0],
    note: chance.sentence(),
    frequency: "Nonrecurring",
  },


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

// const eventData = [
//   {
//     title: "Bought coffee",
//     note: "Bought a coffee from the corner bodega",
//     start: new Date("2023-01-03"),
//     allDay: true,
//   },
//   {
//     title: "Paid electricity bill",
//     note: "Paid ConEdison for electricity bill",
//     start: new Date("2023-01-11"),
//     allDay: true,
//   },
//   {
//     title: "Paid heat bill",
//     note: "Paid ConEdison for heat bill",
//     start: new Date("2023-01-15"),
//     allDay: true,
//   },
//   {
//     title: "Paid phone bill",
//     note: "Venmoed family member for family phone plan",
//     start: new Date("2023-01-20"),
//     allDay: true,
//   },
// ];

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

    let i = 0;
    // const entryList = [];
    while (i++ < 500) {
      const newEntry = await Entry.create({
        entryType: chance.pickone(["User", "API"]),
        start: new Date(chance.date({ year: 2023 })),
        creditDebit: chance.pickone(["Credit", "Debit"]),
        amount: chance.integer({ min: 0, max: 5000 }),
        allDay: true,
        title: chance.word(),
        note: chance.sentence(),
        frequency: "Nonrecurring",
      });
      accountFour.addEntry(newEntry);
    }

    // --------------GOALS--------------

    console.log("adding goals");

    const [goalOne, goalTwo, goalThree, goalFour, goalFive] = await Promise.all(
      goalData.map((goal) => Goal.create(goal))
    );

    // --------------EVENTS--------------

    // console.log("adding events");

    // await Promise.all(eventData.map((event) => Event.create(event)));

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

    // Account.hasMany(Goal);
    // Goal.belongsTo(Account);
    accountOne.addGoal(goalFour);
    accountTwo.addGoal(goalThree);
    accountTwo.addGoal(goalTwo);
    accountThree.addGoal(goalOne);
    accountFour.addGoal(goalFive);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
};

seed();
