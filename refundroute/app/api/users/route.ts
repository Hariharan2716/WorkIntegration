import { NextResponse } from 'next/server';

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET /api/users?page=1&limit=10
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const start = (page - 1) * limit;
  const end = start + limit;

  return NextResponse.json({
    page,
    limit,
    total: users.length,
    data: users.slice(start, end),
  });
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: users.length + 1,
      name: body.name,
    };

    users.push(newUser);

    return NextResponse.json(
      { message: 'User created', data: newUser },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
