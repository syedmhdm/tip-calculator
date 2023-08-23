import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setfriendTip] = useState(0);

  const tipPercentage = (myTip + friendTip) / 2;
  const tip = ((bill / 100) * tipPercentage).toFixed(2);
  const totalPay = Number(bill) + Number(tip);

  function reset() {
    setBill(0);
    setMyTip(0);
    setfriendTip(0);
  }

  return (
    <div>
      <BillInput bill={bill} onBillChange={setBill} />
      <SelectPercentage tip={myTip} onSetTip={setMyTip}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage tip={friendTip} onSetTip={setfriendTip}>
        How did your friend like the service?
      </SelectPercentage>
      <Output totalPay={totalPay} bill={bill} tip={tip} />
      <Reset reset={reset} />
    </div>
  );
}

export default App;

function BillInput({ bill, onBillChange }) {
  return (
    <div>
      <p>How much was the bill</p>
      <input
        type='number'
        value={bill}
        onChange={(e) =>
          onBillChange(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    </div>
  );
}

function SelectPercentage({ children, onSetTip, tip }) {
  return (
    <div>
      <p>{children}</p>
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
function Output({ totalPay, bill, tip }) {
  if (bill === 0 || bill === "")
    return <h3>Enter the bill amount to calculate</h3>;

  return (
    <h3>
      You pay {totalPay} (${bill} + ${tip} tip)
    </h3>
  );
}
function Reset({ reset }) {
  return <button onClick={reset}>Reset</button>;
}
