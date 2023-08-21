import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EmojiTip ',
  description: 'Desafie seu conhecimento cinematográfico decifrando filmes a partir de emojis! Teste suas habilidades interpretativas enquanto decifra enigmáticos emojis e adivinha o título do filme do dia. Divirta-se e desafie seus amigos nesse jogo emocionante de pistas visuais e cultura cinematográfica. Venha jogar EmojiTip e prove que você é o mestre dos emojis no mundo do cinema!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
