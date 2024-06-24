import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const adminId = process.env.ADMIN_ID as string;
    const adminPw = process.env.ADMIN_PW as string;

    const response = {
        adminId: adminId,
        adminPw: adminPw,
    };

    return NextResponse.json(response);
}
