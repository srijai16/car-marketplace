import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/ui/card";
import { Button } from "@/components/ui/button";

function FinancingCalculator({ defaultPrice = 0 }) {
  const [price, setPrice] = useState(defaultPrice);
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState(null);

  const calculateEMI = () => {
    const P = Number(price) - Number(downPayment || 0);
    const annualRate = Number(interestRate);
    const years = Number(loanTerm);

    if (!P || !annualRate || !years) {
      alert("Please fill all required fields");
      return;
    }

    const r = annualRate / 12 / 100; // monthly interest rate
    const n = years * 12; // total months

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    setMonthlyEMI(emi.toFixed(2));
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Financing Calculator</h2>

        <input
          type="number"
          placeholder="Car Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          placeholder="Loan Term (years)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <input
          type="number"
          placeholder="Down Payment"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <Button className="w-full bg-blue-600" onClick={calculateEMI}>
          Calculate EMI
        </Button>

        {monthlyEMI && (
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-sm text-muted-foreground">Estimated Monthly EMI</p>
            <p className="text-xl font-bold">₹ {monthlyEMI}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default FinancingCalculator;