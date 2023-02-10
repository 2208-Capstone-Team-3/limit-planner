import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addDays, formatDistance } from "date-fns";
// import { RootState } from "../../store";

const ProjectionsComponent = () => {
  const reoccurEntries = useSelector(
    (state) => state.reoccurEntries.reoccurEntries
  );
  const accounts = useSelector((state) => state.accounts.accounts);
  const theme = useSelector((state) => state.theme);
  const todayDate = new Date()
  const endDate = theme.theme.dateSelector;



 

  console.log("console log ", todayDate);

  const [projAmount, setProjAmount] = useState("0");

  const projectionAmount = () => {
    let filtered = reoccurEntries.filter((entry) => new Date(entry.start).getTime() <= new Date (endDate).getTime() && new Date(entry.start).getTime() >= new Date(todayDate).getTime());
    let mapped = filtered.map((entry) =>
      entry.creditDebit === "Credit" ? entry.amount : entry.amount * -1
    );
    let reduced = mapped.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, accounts[0].balance);
    let sum = reduced.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    setProjAmount(sum);
  };

  useEffect(() => {
    projectionAmount();
  }, [theme]);

  const currentBalance = accounts[0].balance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

 

  if (reoccurEntries.length === 0) return <p>Loading...</p>;
  return (
    <div>
      <h2>Current Balance: {currentBalance}</h2>
  
  {endDate === "05-05-2023" ? <h2>Click on date for projected balance</h2> : <h2>{`Projected Balance for ${new Date(endDate).toDateString()} is: ${projAmount}`}</h2>}
    </div>
  );
};

export default ProjectionsComponent;
