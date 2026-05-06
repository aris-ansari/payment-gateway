import { NextResponse } from "next/server";

function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function POST() {
  const random = Math.random();

  await delay(2000);

  if (random < 0.6) {
    return NextResponse.json({
      status: "SUCCESS",
      message: "Payment successful",
    });
  }

  if (random < 0.85) {
    return NextResponse.json(
      {
        status: "FAILED",
        message: "Insufficient funds",
      },
      {
        status: 400,
      },
    );
  }

  await delay(8000);

  return NextResponse.json({
    status: "TIMEOUT",
    message: "Payment timeout",
  });
}
