'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, ChangeEvent, KeyboardEvent } from 'react'

const SearchWithEnter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const defaultTitle = searchParams.get('title')?.toString() || ''
  const [title, setTitle] = useState(defaultTitle)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    console.log(`on Enter, Searching title... ${title}`)

    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'page=1&title=war'

    params.set('page', '1')

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    const newUrl = `${pathname}?${params.toString()}`
    replace(newUrl)
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
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        defaultValue={defaultTitle}
      />
    </div>
  )
}

export default SearchWithEnter
