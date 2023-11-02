'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, KeyboardEvent } from 'react'

type Props = { totalPages: number; currentPage: number }

const Pagination = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const { replace } = useRouter()

  useEffect(() => {
    inputRef.current!.value = '' + currentPage
  }, [currentPage])

  // first and last page
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  const handleClick = (e: any) => {
    e.preventDefault()

    const pageNumber = inputRef.current?.value as string
    const newUrl = createPageURL(pageNumber)

    console.log('newUrl=', newUrl) // 'newUrl= /?page=20&title=game'
    replace(newUrl)
  }
  // any page
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    const pageNumber = inputRef.current?.value as string
    const newUrl = createPageURL(pageNumber)

    console.log('newUrl=', newUrl) // 'newUrl= /?page=20&title=game'
    replace(newUrl)
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        marginBottom: '20px',
      }}
    >
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>Previous</Link>
      )}

      <label
        htmlFor='pageInput'
        style={{
          marginLeft: '20px',
        }}
      >
        Page:
        <input
          id='pageInput'
          type='number'
          min={1}
          max={totalPages}
          style={{
            color: '#a1a1a1',
            backgroundColor: '#212426',
            marginLeft: '10px',

            marginBottom: '5px',
          }}
          ref={inputRef}
          onKeyUp={handleKeyUp}
          defaultValue={currentPage}
        />
        <input
          type='submit'
          onClick={handleClick}
          value='Go'
          style={{
            color: '#a1a1a1',
            backgroundColor: '#212426',
            cursor: 'pointer',
            border: '1 solid red',
            marginRight: '20px',
          }}
        />
        Total page: {totalPages}
      </label>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          style={{
            marginLeft: '20px',
          }}
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default Pagination
