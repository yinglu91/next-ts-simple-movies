'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, ChangeEvent, KeyboardEvent } from 'react'

const SearchWithButtonAndEnter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const [title, setTitle] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const searchMovies = () => {
    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'page=1&query=a'

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    const newUrl = `${pathname}?${params.toString()}`
    replace(newUrl)
  }

  const handleClick = () => {
    console.log(`on click, Searching title... ${title}`)

    searchMovies()
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
        defaultValue={searchParams.get('title')?.toString()}
      />

      <Image
        src='/search.svg'
        className='rounded-full'
        alt={`search picture`}
        width={28}
        height={28}
        onClick={handleClick}
      />
    </div>
  )
}

export default SearchWithButtonAndEnter
