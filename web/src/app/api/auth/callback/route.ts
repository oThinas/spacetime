import { api } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const registerResonse = await api.post('/register', { code });
  const { token } = registerResonse.data;

  const redirectURL = new URL('/', request.url);
  const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
  const cookieExpriation = THIRTY_DAYS_IN_SECONDS;

  return NextResponse.redirect(
    redirectURL,
    { headers: { 'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpriation};` } },
  );
}
