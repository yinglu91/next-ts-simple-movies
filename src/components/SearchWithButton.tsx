'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, ChangeEvent } from 'react'

const SearchWithButton = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const [title, setTitle] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleClick = () => {
    console.log(`on click, Searching title... ${title}`)

    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'page=1&query=a'

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='search'>
      <input
        placeholder='Search for movies with title'
        onChange={handleChange}
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

export default SearchWithButton
