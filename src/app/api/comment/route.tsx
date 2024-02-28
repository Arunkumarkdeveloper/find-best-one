import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/backend/ConnectDB";
import CommentShcema from "@/backend/CommentShcema";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request: NextRequest) => {
  noStore();
  await ConnectDB();
  const comments = await CommentShcema.find();
  return NextResponse.json(comments, { status: 200 });
};
