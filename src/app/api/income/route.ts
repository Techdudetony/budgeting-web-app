import { NextRequest, NextResponse } from "next/server";
import { incomeSchema } from "@/lib/validators/income";
import { createIncome, getIncomes } from "@/services/income/income.service";

/* Handles GET requests for retrieving all income records */
export async function GET() {
  try {
    const incomes = await getIncomes();

    return NextResponse.json(
      {
        success: true,
        data: incomes,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve income records.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

/* Handles POST requests for creating a new income source. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsedData = incomeSchema.safeParse({
      sourceName: body.sourceName,
      amount: Number(body.amount),
      frequency: body.frequency,
      nextExpectedDate: body.nextExpectedDate || undefined,
      hourlyHours:
        body.hourlyHours !== undefined && body.hourlyHours !== ""
          ? Number(body.hourlyHours)
          : undefined,
      hourlyPaySchedule: body.hourlyPaySchedule || undefined,
    });

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsedData.error.flatten(),
        },
        { status: 400 },
      );
    }

    const income = await createIncome(parsedData.data);

    return NextResponse.json(
      {
        success: true,
        data: income,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create income record.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
