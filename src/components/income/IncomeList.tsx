import {
  formatCurrency,
  formatFrequency,
  formatPaySchedule,
  getEstimatedPayPerPeriod,
} from "@/lib/utils/incomeSummary";

type IncomeRecord = {
  id: string;
  sourceName: string;
  amount: number;
  frequency: string;
  nextExpectedDate: string | null;
  hourlyHours?: number | null;
  hourlyPaySchedule?: string | null;
};

type IncomeListProps = {
  incomes: IncomeRecord[];
};

/* Displays the current list of income records. */
export default function IncomeList({ incomes }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <section className="income-list-card">
        <h2 className="income-list-card__title">Income Records</h2>
        <p className="income-list-card__empty">
          No income records have been added yet.
        </p>
      </section>
    );
  }

  return (
    <section className="income-list-card">
      <h2 className="income-list-card__title">Income Records</h2>

      <div className="income-list">
        {incomes.map((income) => {
          const estimatedPayPerPeriod = getEstimatedPayPerPeriod(income);

          return (
            <article key={income.id} className="income-list__item">
              <div className="income-list__details">
                <h3 className="income-list__source">{income.sourceName}</h3>

                <p className="income-list__meta">
                  {formatCurrency(income.amount)} ·{" "}
                  {formatFrequency(income.frequency)}
                </p>

                {income.frequency === "hourly" ? (
                  <>
                    <p className="income-list__meta">
                      Pay Schedule:{" "}
                      {formatPaySchedule(income.hourlyPaySchedule)}
                    </p>

                    <p className="income-list__meta">
                      Hours/Week: {income.hourlyHours ?? "Not set"}
                    </p>

                    <p className="income-list__meta">
                      Estimated Pay: {formatCurrency(estimatedPayPerPeriod)}
                    </p>
                  </>
                ) : null}

                <p className="income-list__meta">
                  Next Expected Date:{" "}
                  {income.nextExpectedDate
                    ? formatDate(income.nextExpectedDate)
                    : "Not set"}
                </p>
              </div>

              <div className="income-list__amount">
                {formatCurrency(income.amount)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* Formats a stored ISO date string for display in the interface. */
function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
