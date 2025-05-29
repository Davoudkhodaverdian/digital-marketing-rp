// app/api/auth/start/route.ts
import { NextResponse } from 'next/server';
import users from '@/fundamental/users/users.json';

export async function POST(request: Request) {
    try {
        const { text } = await request.json()
        const phoneRegex = /^09\d{9}$/;
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/;
        const isPhone = phoneRegex.test(text);
        const isUsername = usernameRegex.test(text);
        if (isPhone) {
            // It's a mobile number    
            if (!users.find(user => user.phone === text)) {
                return NextResponse.json({ code: 404, status: 'failed', message: { en: "user with this phone is not found", fa: "کاربر با شماره موبایل مورد نظر یافت نشد." } });
            }
            // It's a mobile number of user found — a code will be sent for 2 minute 
            return NextResponse.json({ code: 201, status: 'otp_sent', expiresIn: 120, message: "text is a correct phone, otp must be sent" })
        } else if (isUsername) {
            // It's a mobile Username
            if (!users.find(user => user.username === text)) {
                return NextResponse.json({ code: 404, status: 'failed',  message: { en: "user with this username is not found", fa: "کاربر با نام کاربری مورد نظر یافت نشد." } });
            }
            // Username of user found — the password must be entered
            return NextResponse.json({ code: 201, status: 'password_required', message: "text is a correct username, password must be entered" })
        } else {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "username or phone is not sent correctly", fa: "نام کاربری یا شماره موبایل به درستی وارد نشده است." } })
        }
    } catch (error) {
        return NextResponse.json({ code: 500, status: 'server_error', message: { en: "something went wrong", fa: "متاسفانه خطایی رخ داده است." } })
    }
}
