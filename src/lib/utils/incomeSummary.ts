export type IncomeSummaryRecord = {
  amount: number;
  frequency: string;
  hourlyHours?: number | null;
  hourlyPaySchedule?: string | null;
};

type IncomeSummaryResult = {
  monthlyTotal: number;
  annualTotal: number;
};

/* Calculates the estimated pay amount for a single pay period. */
export function getEstimatedPayPerPeriod(record: IncomeSummaryRecord): number {
  if (record.frequency === "hourly") {
    if (!record.hourlyHours || !record.hourlyPaySchedule) {
      return 0;
    }

    const weeklyPay = record.amount * record.hourlyHours;

    if (record.hourlyPaySchedule === "weekly") {
      return weeklyPay;
    }

    if (record.hourlyPaySchedule === "biweekly") {
      return weeklyPay * 2;
    }

    return 0;
  }

  return record.amount;
}

/* Converts a single income record into an estimated monthly amount. */
export function getMonthlyIncomeAmount(record: IncomeSummaryRecord): number {
  if (record.frequency === "hourly") {
    const payPerPeriod = getEstimatedPayPerPeriod(record);

    if (record.hourlyPaySchedule === "weekly") {
      return (payPerPeriod * 52) / 12;
    }

    if (record.hourlyPaySchedule === "biweekly") {
      return (payPerPeriod * 26) / 12;
    }

    return 0;
  }

  switch (record.frequency) {
    case "weekly":
      return (record.amount * 52) / 12;
    case "biweekly":
      return (record.amount * 26) / 12;
    case "semimonthly":
      return record.amount * 2;
    case "monthly":
      return record.amount;
    case "one-time":
      return record.amount / 12;
    default:
      return 0;
  }
}

/* Converts a single income record into an estimated annual amount. */
export function getAnnualIncomeAmount(record: IncomeSummaryRecord): number {
  return getMonthlyIncomeAmount(record) * 12;
}

/* Aggregates all income records into monthly and annual totals. */
export function getIncomeSummary(
  records: IncomeSummaryRecord[],
): IncomeSummaryResult {
  const monthlyTotal = records.reduce((total, record) => {
    return total + getMonthlyIncomeAmount(record);
  }, 0);

  const annualTotal = records.reduce((total, record) => {
    return total + getAnnualIncomeAmount(record);
  }, 0);

  return {
    monthlyTotal,
    annualTotal,
  };
}

/* Formats a numeric value as US currency. */
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/* Formats stored pay schedule text for display. */
export function formatPaySchedule(value: string | null | undefined) {
  switch (value) {
    case "weekly":
      return "Weekly";
    case "biweekly":
      return "Biweekly";
    default:
      return "Not set";
  }
}

/* Formats a standard income frequency for display. */
export function formatFrequency(value: string) {
  switch (value) {
    case "hourly":
      return "Hourly";
    case "weekly":
      return "Weekly";
    case "biweekly":
      return "Biweekly";
    case "semimonthly":
      return "Semi-monthly";
    case "monthly":
      return "Monthly";
    case "one-time":
      return "One-time";
    default:
      return value;
  }
}
