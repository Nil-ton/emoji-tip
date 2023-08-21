'use client'

import React from 'react'
import { cookiesFront } from '@/infra/cookies/front'
export function FormLogin() {
  const [values, setValues] = React.useState({ username: '', password: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name
    const value = e.target.value
    setValues((currentState) => ({ ...currentState, [name]: value }))
  }

  const kickMovie = cookiesFront.useGet<string>('KICK_MOVIE', '')

  React.useEffect(() => {
    setValues({ password: kickMovie, username: kickMovie })
  }, [kickMovie])

  return <main className='flex flex-col items-center mt-14'>
    <div className='relative'>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-2'>
        <div className='flex flex-col'>
          <label htmlFor="username">Nome de usuário</label>
          <input
            className='bg-slate-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md outline-none '
            type="text"
            name="username"
            id='username'
            placeholder='Username'
            value={values.username}
            readOnly
            onChange={handleChange} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">Senha</label>
          <input
            className='bg-slate-900 text-slate-200 border-2 px-4 py-3 border-blue-900 rounded-md outline-none'
            type="password"
            placeholder='Password'
            name="password"
            id='password'
            readOnly
            value={values.password} onChange={handleChange} />
        </div>
      </div>
    </div>
    <span className='flex justify-center mt-5 z-10'>Para liberar as credenciais acerte a pergunta a baixo</span>
  </main>
}