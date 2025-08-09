import { NextResponse, type NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { dataBasePrisma } from "@/databasePrisma";

export default async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    console.log("Signup data:", { fullName, email, password });

    const existingUser = await dataBasePrisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await dataBasePrisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
      },
    });
    console.log("New user created:", newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
