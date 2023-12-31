import { Count } from '@/components/Count'
import { EmojiTip } from '../components/EmojiTip'
import { FieldMovieSearch } from '../components/FieldMovieSearch'
import { FormLogin } from '../components/FormLogin'

export default async function Home() {
  return (
    <div className='min-h-screen relative mx-10'>
      <div className='flex flex-col gap-5'>
        <FormLogin />
        <EmojiTip />
        <Count />
        <FieldMovieSearch />
      </div>
    </div>
  )
}
