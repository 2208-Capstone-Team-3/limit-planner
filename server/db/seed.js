const db = require("./db.js");
const { Account, Entry, Goal, User } = require("./index.js");

const entryData = [
  {
    entryType: "API",
    //YYYY-MM-DD
    date: "2022-03-24",
    creditDebit: "Credit",
    amount: 400,
    title: "Groceries",
    note: "I went to buy groceries at Walmart",
    frequency: "Weekly",
  },
  {
    entryType: "API",
    date: "2022-04-24",
    creditDebit: "Debit",
    amount: 500,
    title: "Snacks",
    note: "I went to buy snacks at Walmart",
    frequency: "Biweekly",
  },
  {
    entryType: "User",
    date: "2022-05-24",
    creditDebit: "Credit",
    amount: 600,
    title: "Drugs",
    note: "I went to buy drugs at Walmart",
    frequency: "Monthly",
  },
  {
    entryType: "User",
    date: "2022-06-24",
    creditDebit: "Debit",
    amount: 700,
    title: "Alcohol",
    note: "I went to buy alcohol at Walmart",
    frequency: "ByDate",
  },
  {
    entryType: "User",
    date: "2022-07-24",
    creditDebit: "Debit",
    amount: 700,
    title: "Bribes",
    note: "I went to bribe people at Walmart",
    frequency: "ByDate",
  },
];
const goalData = [
  {
    name: "Buy icecream",
    goalAmount: 7000,
    startAmount: 20,
    startDate: "2022-11-05",
    endDate: "2023-01-04",
    victory: false,
  },
  {
    name: "Buy a car",
    goalAmount: 15000,
    startAmount: 2,
    startDate: "2022-10-05",
    endDate: "2023-04-07",
    victory: false,
  },
  {
    name: "Retirement",
    goalAmount: 100000000,
    startAmount: 7000,
    startDate: "2022-06-05",
    endDate: "2023-09-12",
    victory: true,
  },
  {
    name: "Buy coffin for self",
    goalAmount: 4600454,
    startAmount: 25891,
    startDate: "2022-06-05",
    endDate: "2023-09-12",
    victory: true,
  },
];
const userData = [
  {
    password: "123",
    username: "coolguy6969",
    firstName: "Pam",
    lastName: "Pamerson",
    fullName: "Pam Pamerson",
    phoneNum: "58358349538",
    email: "strongperson@gmail.com",
    birthday: "051299",
    avatarUrl: "placeholder",
    isAdmin: false,
  },
  {
    password: "123",
    username: "icantmoney",
    firstName: "Dave",
    lastName: "Davidson",
    fullName: "Dave Davidson",
    phoneNum: "1535186538",
    email: "pizza@gmail.com",
    birthday: "070589",
    avatarUrl: "placeholder",
    isAdmin: false,
  },
  {
    password: "123",
    username: "notjeff",
    firstName: "Jeff",
    lastName: "Jefferson",
    fullName: "Jeff Jefferson",
    phoneNum: "9549351325",
    email: "buttman@gmail.com",
    birthday: "031895",
    avatarUrl: "placeholder",
    isAdmin: false,
  },
  {
    password: "123",
    username: "sailormoon",
    firstName: "Kolby",
    lastName: "Wolf",
    fullName: "Kolby Wolf",
    phoneNum: "9846531258",
    email: "alsobuttman@gmail.com",
    birthday: "040404",
    avatarUrl: "placeholder",
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
const seed = async () => {
  await db.sync({ force: true });

  const [accountOne, accountTwo, accountThree, accountFour] = await Promise.all(
    accountData.map((account) => Account.create(account))
  );
  const [entryOne, entryTwo, entryThree, entryFour, entryFive] = await Promise.all(
    entryData.map((entry) => Entry.create(entry))
  );
  const [goalOne, goalTwo, goalThree, goalFour] = await Promise.all(
    goalData.map((goal) => Goal.create(goal))
  );
  const [userOne, userTwo, userThree, userFour] = await Promise.all(
    userData.map((user) => User.create(user))
  );

  //magic methods go here
  
  // User.hasMany(Account)
  // Account.belongsTo(User)
  userOne.addAccount(accountOne);
  userTwo.addAccount(accountTwo);
  userThree.addAccount(accountThree);
  userFour.addAccount(accountFour);
  
  // Account.hasMany(Entry);
  // Entry.belongsTo(Account);
  
  accountOne.addEntry(entryOne)
  accountTwo.addEntry(entryTwo)
  accountThree.addEntry(entryThree)
  accountFour.addEntry(entryFour)
  accountFour.addEntry(entryFive)
  
  // Account.hasMany(Goal);
  // Goal.belongsTo(Account);
  accountOne.addGoal(goalFour)
  accountTwo.addGoal([goalThree, goalTwo])
  accountThree.addGoal(goalOne)
  
};

seed();
