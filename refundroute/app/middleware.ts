import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: number;
  role: "ADMIN" | "USER";
};

const ADMIN_ONLY_PATHS = ["/api/admin"];

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const pathname = req.nextUrl.pathname;

    // Admin-only route protection
    const isAdminRoute = ADMIN_ONLY_PATHS.some((path) =>
      pathname.startsWith(path)
    );

    if (isAdminRoute && decoded.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    // Token valid → allow request
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
