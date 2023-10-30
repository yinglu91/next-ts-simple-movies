'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, ChangeEvent, KeyboardEvent } from 'react'

const SearchWithButtonAndEnter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const defaultTitle = searchParams.get('title')?.toString() || ''
  const [title, setTitle] = useState(defaultTitle)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const searchMovies = () => {
    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'title=game'

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    const newUrl = `${pathname}?${params.toString()}`
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
      <input
        placeholder='Search for movies with title'
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        defaultValue={defaultTitle}
      />

      <Image
        src='/search.svg'
        className='rounded-full'
        alt={`search picture`}
        width={28}
        height={28}
        onClick={searchMovies}
      />
    </div>
  )
}

export default SearchWithButtonAndEnter
