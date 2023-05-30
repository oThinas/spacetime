import { ReactNode } from 'react';
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google';

import './globals.css';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' });
const baiJamjuree = BaiJamjuree({ subsets: ['latin'], variable: '--font-bai-jamjuree', weight: '700' });

export const metadata = {
  title: 'Spacetime',
  description: 'Versão web do app Spacetime. Guarde suas memórias e relembre sua linha do tempo.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br' dir='ltr'>
      <body className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
