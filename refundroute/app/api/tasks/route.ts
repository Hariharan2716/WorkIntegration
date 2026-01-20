import { NextResponse } from 'next/server';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const tasks: Task[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }

  const task: Task = {
    id: tasks.length + 1,
    title: body.title,
    completed: false,
  };

  tasks.push(task);

  return NextResponse.json(task, { status: 201 });
}
