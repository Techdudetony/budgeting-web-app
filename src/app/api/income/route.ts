import { NextRequest, NextResponse } from "next/server";
import { incomeSchema } from "@/lib/validators/income";
import { createIncome } from "@/services/income/income.service";

/* Handles POST requests for creating a new income source. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsedData = incomeSchema.safeParse({
      ...body,
      amount: Number(body.amount),
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

    /* Placeholder user id until Authentication is added. */
    const userId = "demo-user-id";

    const income = await createIncome(userId, parsedData.data);

    return NextResponse.json(
      {
        success: true,
        data: income,
      },
      { status: 201 },
    );
  } catch (error) {
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
