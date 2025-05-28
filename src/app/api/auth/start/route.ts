// app/api/auth/start/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { text } = await request.json()
        const phoneRegex = /^09\d{9}$/;
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
        const isPhone = phoneRegex.test(text);
        const isUsername = usernameRegex.test(text);
        if (isPhone) {
            // It's a mobile number — a code will be sent
            return NextResponse.json({ code: 201, status: 'otp_sent', expiresIn: 120, message: "text is a correct phone, otp must be sent" }) // 2 minute
        } else if (isUsername) {
            // Username detected — the password must be entered
            return NextResponse.json({ code: 201, status: 'password_required', message: "text is a correct username, password must be entered" })
        } else {
            return NextResponse.json({ code: 401, status: 'failed', message: "username or phone is not sent correctly" })
        }
    } catch (error) {
        return NextResponse.json({ code: 500, status: 'server_error', message: "something went wrong" })
    }
}
