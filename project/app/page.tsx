"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { Transaction } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Personal Finance Tracker</h1>
          <p className="text-muted-foreground">
            Track your expenses and visualize your spending patterns in INR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onSubmit={addTransaction} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
            <MonthlyExpensesChart transactions={transactions} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </Card>
      </div>
    </main>
  );
}