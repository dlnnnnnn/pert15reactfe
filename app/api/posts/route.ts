import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const newPost = await db.post.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(newPost, { status: 201 });
}