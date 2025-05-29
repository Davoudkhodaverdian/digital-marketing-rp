// app/api/auth/verify-password/route.ts
import { NextResponse } from 'next/server';
import users from '@/fundamental/users/users.json';

export async function POST(request: Request) {
    try {
        const { password, username } = await request.json()
        if (!password) {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "password is required", fa: "رمز عبور الزامی میباشد" } })
        } else if (password.length < 3) {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "password must be at least 3 characters", fa: "رمز عبور باید حداقل دارای سه کاراکتر باشد" } })
        }
        const user = users?.find(user => user.username === username);
        if (!user) {
            return NextResponse.json({ code: 404, status: 'failed', message: { en: "user is not found", fa: "کاربر مورد نظر یافت نشد." } });
        } else if (user?.password === password) {
            return NextResponse.json({ code: 200, status: 'successful', message: { en: "Login was successful", fa: "ورود با موفقیت انجام شد" } })
        } else {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "password is incorrect", fa: "رمز عبور وارد شده صحیح نمیباشد." } })
        }

    } catch (error) {
        return NextResponse.json({ code: 500, status: 'server_error', message: { en: "something went wrong", fa: "متاسفانه خطایی رخ داده است." } })
    }
}
