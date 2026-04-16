"use client";

import { useState } from "react";

type IncomeFormProps = {
  onIncomeCreated: () => Promise<void>;
};

type FormState = {
  sourceName: string;
  amount: string;
  frequency: string;
  nextExpectedDate: string;
  hourlyHours: string;
  hourlyPaySchedule: string;
};

const initialFormState: FormState = {
  sourceName: "",
  amount: "",
  frequency: "monthly",
  nextExpectedDate: "",
  hourlyHours: "",
  hourlyPaySchedule: "weekly",
};

/* Form component used to create a new income record. */
export default function IncomeForm({ onIncomeCreated }: IncomeFormProps) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isHourlyIncome = formData.frequency === "hourly";

  /* Updates local form state when the user changes a field value. */
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previousState) => {
      const updatedState = {
        ...previousState,
        [name]: value,
      };

      if (name === "frequency" && value !== "hourly") {
        updatedState.hourlyHours = "";
        updatedState.hourlyPaySchedule = "weekly";
      }

      return updatedState;
    });
  }

  /* Submits the form data to the income API route. */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        const fallbackMessage = "Failed to create income record.";
        setErrorMessage(result.message || fallbackMessage);
        return;
      }

      setSuccessMessage("Income record created successfully.");
      setFormData(initialFormState);
      await onIncomeCreated();
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="income-form-card">
      <div className="income-form-card__header">
        <h2 className="income-form-card__title">Add Income</h2>
        <p className="income-form-card__description">
          Add a new income source and assign its expected pay frequency.
        </p>
      </div>

      <form className="income-form" onSubmit={handleSubmit}>
        <div className="income-form__grid">
          <label className="income-form__field">
            <span className="income-form__label">Source Name</span>
            <input
              className="income-form__input"
              type="text"
              name="sourceName"
              value={formData.sourceName}
              onChange={handleChange}
              placeholder="Example: Primary Job"
              required
            />
          </label>

          <label className="income-form__field">
            <span className="income-form__label">
              {isHourlyIncome ? "Hourly Rate" : "Amount"}
            </span>
            <input
              className="income-form__input"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </label>

          <label className="income-form__field">
            <span className="income-form__label">Frequency</span>
            <select
              className="income-form__input"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              required
            >
              <option value="hourly">Hourly</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="semimonthly">Semi-monthly</option>
              <option value="monthly">Monthly</option>
              <option value="one-time">One-time</option>
            </select>
          </label>

          {isHourlyIncome ? (
            <>
              <label className="income-form__field">
                <span className="income-form__label">Hours Per Week</span>
                <input
                  className="income-form__input"
                  type="number"
                  name="hourlyHours"
                  value={formData.hourlyHours}
                  onChange={handleChange}
                  placeholder="Example: 40"
                  min="1"
                  step="0.1"
                  required={isHourlyIncome}
                />
              </label>

              <label className="income-form__field">
                <span className="income-form__label">Hourly Pay Schedule</span>
                <select
                  className="income-form__input"
                  name="hourlyPaySchedule"
                  value={formData.hourlyPaySchedule}
                  onChange={handleChange}
                  required={isHourlyIncome}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                </select>
              </label>
            </>
          ) : null}

          <label className="income-form__field">
            <span className="income-form__label">Next Expected Date</span>
            <input
              className="income-form__input"
              type="date"
              name="nextExpectedDate"
              value={formData.nextExpectedDate}
              onChange={handleChange}
            />
          </label>
        </div>

        {errorMessage ? (
          <p className="income-form__message income-form__message--error">
            {errorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="income-form__message income-form__message--success">
            {successMessage}
          </p>
        ) : null}

        <div className="income-form__actions">
          <button
            className="income-form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Income"}
          </button>
        </div>
      </form>
    </section>
  );
}
