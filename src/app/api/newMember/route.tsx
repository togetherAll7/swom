import { supabaseClient } from '../../../utils/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('data', data);
  const { email } = data;

  const supabase = supabaseClient();

  // Invite the user by email
  const { data: res, error } = await supabase.auth.admin.inviteUserByEmail(
    email,
    {
      data: { role: 'client' },
      redirectTo: `http://localhost:3000/sign-up`,
    }
  );

  // const { data: res, error: error } = await supabase.auth.signUp(
  //   {
  //     email: email,
  //     password: 'password',
  //     options: {
  //       data: { role: 'client' },
  //     },
  //   }
  // );
  return NextResponse.json({ res, error });
}
