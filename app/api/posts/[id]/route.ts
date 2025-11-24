import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await db.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await db.post.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ message: "Deleted" }, { status: 204 });
}