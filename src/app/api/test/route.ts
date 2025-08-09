import { NextRequest, NextResponse } from 'next/server';
import { dataBasePrisma } from '@/databasePrisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const created = await dataBasePrisma.user.create({
      data: { email },
    });

    return NextResponse.json({ success: true, user: created }, { status: 201 });
  } catch (error) {
    console.error("Prisma error:", error); // <-- log actual error
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
