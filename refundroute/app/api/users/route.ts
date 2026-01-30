import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { hasPermission, Action, Role } from "@/lib/rbac";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function authorize(req: Request, action: Action) {
  const auth = req.headers.get("authorization");
  if (!auth) return { allowed: false, status: 401 };

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: Role };
    const allowed = hasPermission(payload.role, action);

    console.log(
      `[RBAC] ${payload.role} tried ${action}: ${
        allowed ? "ALLOWED" : "DENIED"
      }`
    );

    return { allowed, role: payload.role };
  } catch {
    return { allowed: false, status: 401 };
  }
}

export async function GET(req: Request) {
  const auth = authorize(req, "read");
  if (!auth.allowed) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return NextResponse.json([{ id: 1, name: "Alice" }]);
}

export async function DELETE(req: Request) {
  const auth = authorize(req, "delete");
  if (!auth.allowed) {
    return NextResponse.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return NextResponse.json({ success: true, message: "User deleted" });
}
