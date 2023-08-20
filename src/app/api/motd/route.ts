import { NextResponse } from "next/server";
import {
  getMessageOfTheDay,
  createMessageOfTheDay,
  deleteMessageOfTheDay,
} from "../../lib/data";

enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  INTERNAL_SERVER_ERROR = 500,
}

export const GET = async (req: Request, res: Response) => {
  try {
    const message = getMessageOfTheDay();
    return NextResponse.json(
      { status: "OK", message },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "Error", error },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
export const POST = async (req: Request, res: Response) => {
  const { motd } = await req.json();
  try {
    if (!motd) {
      throw new Error("Message must be set");
    }
    const message = createMessageOfTheDay(motd);
    return NextResponse.json(
      { status: "OK", message },
      { status: HttpStatusCode.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "Error", error },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const message = deleteMessageOfTheDay();
    return NextResponse.json(
      { status: "OK", message },
      { status: HttpStatusCode.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "Error", error },
      { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
};
