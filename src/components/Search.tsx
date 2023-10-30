'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const Search = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname() // '/'
  const { replace } = useRouter()

  const defaultTitle = searchParams.get('title')?.toString() || ''

  const handleSearch2 = (term: string) => {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)
    // URLSearchParams - Web API use to get params string like 'page=1&title=war'

    params.set('page', '1')

    if (term) {
      params.set('title', term)
    } else {
      params.delete('title')
    }

    const newUrl = `${pathname}?${params.toString()}`
    replace(newUrl)
    // the URL is updated to /?love if input: love
  }

  const handleSearch = useDebouncedCallback(handleSearch2, 600)
  // only run the code after a specific time once the user has stopped typing (600ms).
  // By debouncing, you can reduce the number of requests sent to the api, thus saving resources.

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
        onChange={(event) => handleSearch(event.target.value)}
        defaultValue={defaultTitle}
      />
    </div>
  )
}

export default Search
