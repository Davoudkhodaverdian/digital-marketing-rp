// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const { otp, phone } = await request.json()

    if (otp === '123456') {
        return NextResponse.json({ success: true, token: 'mock-jwt-token' })
    } else {
        return NextResponse.json({ success: false, error: 'کد اشتباه است' }, { status: 401 })
    }
}
