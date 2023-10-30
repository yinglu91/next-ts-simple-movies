'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { KeyboardEvent, useRef } from 'react'

const SearchWithEnter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const defaultTitle = searchParams.get('title')?.toString() || ''

  console.log(`YYYYYLLLL, title=${inputRef.current?.value}`)

  const searchMovies = () => {
    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'page=1&title=war'

    params.set('page', '1')

    const title = inputRef.current?.value
    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    const newUrl = `${pathname}?${params.toString()}`

    console.log('newUrl=', newUrl) // 'newUrl= /?page=1&title=game' when input 'game', then hit Enter/Click search icon.
    replace(newUrl)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    searchMovies()
  }

  return (
    <div className='search'>
      <Image
        src='/search.svg'
        className='rounded-full'
        alt={`search picture`}
        width={28}
        height={28}
      />

      <input
        placeholder='Search for movies with title'
        ref={inputRef}
        onKeyUp={handleKeyUp}
        defaultValue={defaultTitle}
      />
    </div>
  )
}

export default SearchWithEnter
