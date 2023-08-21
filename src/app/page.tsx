import { Count } from '@/components/Count'
import { Emojis } from '../components/EmojiTip'
import { FieldMovieSearch } from '../components/FieldMovieSearch'
import { FormLogin } from '../components/FormLogin'

export default async function Home() {
  return (
    <div className='min-h-screen relative '>
      <div className='flex flex-col gap-5'>
        <FormLogin />
        <Emojis />
        <Count />
        <FieldMovieSearch />
      </div>
    </div>
  )
}
