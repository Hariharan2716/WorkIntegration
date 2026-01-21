import { NextResponse } from 'next/server';

const projects: unknown[] = [];

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name) {
    return NextResponse.json(
      { error: 'Project name required' },
      { status: 400 }
    );
  }

  const project = {
    id: projects.length + 1,
    name: body.name,
  };

  projects.push(project);

  return NextResponse.json(project, { status: 201 });
}
