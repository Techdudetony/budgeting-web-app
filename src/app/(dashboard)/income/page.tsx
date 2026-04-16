"use client";

import { useEffect, useState } from "react";
import PageIntro from "@/components/ui/PageIntro";
import IncomeForm from "@/components/forms/IncomeForm";
import IncomeList from "@/components/income/IncomeList";
import { formatCurrency, getIncomeSummary } from "@/lib/utils/incomeSummary";

type IncomeRecord = {
  id: string;
  sourceName: string;
  amount: number;
  frequency: string;
  nextExpectedDate: string | null;
  hourlyHours?: number | null;
  hourlyPaySchedule?: string | null;
};

/* Income management page. */
export default function IncomePage() {
  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const incomeSummary = getIncomeSummary(incomes);

  /* Loads all income records from the API. */
  async function loadIncomes() {
    try {
      setLoadError("");

      const response = await fetch("/api/income", {
        method: "GET",
      });

      const result = await response.json();

      if (!response.ok) {
        setLoadError(result.message || "Failed to load income records.");
        return;
      }

      setIncomes(result.data ?? []);
    } catch (error: unknown) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "An unexpected error ocurred while loading income records.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadIncomes();
  }, []);

  return (
    <div className="income-page">
      <PageIntro
        title="Income"
        description="Track your income sources, pay schedule, and future earnings projections."
      />

      <section className="income-summary-strip">
        <article className="income-summary-strip__card">
          <p className="income-summary-strip__label">
            Estimated Monthly Income
          </p>
          <h2 className="income-summary-strip__value">
            {formatCurrency(incomeSummary.monthlyTotal)}
          </h2>
        </article>

        <article className="income-summary-strip__card">
          <p className="income-summary-strip__label">Estimated Annual Income</p>
          <h2 className="income-summary-strip__value">
            {formatCurrency(incomeSummary.annualTotal)}
          </h2>
        </article>
      </section>

      <div className="income-page__layout">
        <IncomeForm onIncomeCreated={loadIncomes} />

        {isLoading ? (
          <section className="income-list-card">
            <h2 className="income-list-card__title">Income Records</h2>
            <p className="income-list-card__empty">Loading income records...</p>
          </section>
        ) : loadError ? (
          <section className="income-list-card">
            <h2 className="income-list-card__title">Income Records</h2>
            <p className="income-form__message income-form__message--error">
              {loadError}
            </p>
          </section>
        ) : (
          <IncomeList incomes={incomes} />
        )}
      </div>
    </div>
  );
}
