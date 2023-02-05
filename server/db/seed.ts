import { VIRTUAL } from "sequelize";
import db from "./db.js";
import { Account, Entry, Goal, User, Event } from "./index.js";
import {addDays, addMonths, addYears, endOfDay} from 'date-fns';

const entryData = [
  {
    entryType: "API",
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
    title: "Monthly Electricityt Bill",
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
    start: new Date("2023-01-07"),
    allDay: true,
    frequency:'ByDate'
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

const eventData = [
  {
    title: "Paycheck",
    note: "Got paid today!",
    start: new Date("2023-01-05"),
    allDay: true,
    frequency:'Bi-Weekly'
  },
  {
    title: "Paid electric bill",
    note: "Paid ConEd",
    start: new Date("2023-01-31"),
    allDay: true,
    frequency:'Monthly'
  },
];

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

    // --------------GOALS--------------

    console.log("adding goals");

    const [goalOne, goalTwo, goalThree, goalFour, goalFive] = await Promise.all(
      goalData.map((goal) => Goal.create(goal))
    );

    // --------------EVENTS--------------

    console.log("adding events");

    // moving this logic to the front end on calendar component!
    // const seedEvents = (eventData:any) => {
    //   eventData.forEach((event:any)=>{
    //     if (event.frequency === "Bi-Weekly"){
    //       for (let i = 0; i <= 26; i++){
    //         Event.create(event)
    //         event.start = addDays(event.start, 14)
    //       }
    //     }else if (event.frequency === "Monthly"){
    //         for (let i = 0; i <= 12; i++){
    //           Event.create(event)
    //           event.start = addMonths(event.start, 1)
    //         }
    //       }})
    //     }
    // seedEvents(eventData);

    await Promise.all(eventData.map((event) => Event.create(event)));

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
  };
};

seed();
