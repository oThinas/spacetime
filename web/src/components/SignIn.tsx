import { User } from 'lucide-react';

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className='group flex items-center gap-3 text-left transition-colors hover:text-gray-50'
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 transition-transform group-hover:scale-125'>
        <User className='h-5 w-5 text-gray-500 transition-colors group-hover:text-gray-50'/>
      </div>

      <p className='max-w-[140px] text-sm leading-snug'>
        <span className='underline'>
          Crie sua conta
        </span>
        {' '} e salve suas memórias
      </p>
    </a>
  );
}
