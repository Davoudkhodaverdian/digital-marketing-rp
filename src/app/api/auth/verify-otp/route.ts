// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server'
import users from '@/fundamental/users/users.json';

export async function POST(request: Request) {
    try {
    const { otp } = await request.json()
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
        if (!otp) {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "code is required", fa: "کد الزامی میباشد" } })
        } else if (otp.length !== 4) {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "code must be 4 characters", fa: "کد باید چهار کاراکتر باشد" } })
        }
        const user = users?.find(user => user.phone === phone);
        if (!user) {
            return NextResponse.json({ code: 404, status: 'failed', message: { en: "user is not found", fa: "کاربر مورد نظر یافت نشد." } });
        } else if (user?.otp === otp) {
            return NextResponse.json({ code: 200, status: 'successful', message: { en: "Login was successful", fa: "ورود با موفقیت انجام شد" } })
        } else {
            return NextResponse.json({ code: 401, status: 'failed', message: { en: "code is incorrect", fa: "کد وارد شده صحیح نمیباشد." } })
        }
    
    } catch (error) {
        return NextResponse.json({ code: 500, status: 'server_error', message: { en: "something went wrong", fa: "متاسفانه خطایی رخ داده است." } })
    }
}
