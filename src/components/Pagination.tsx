'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = { totalPages: number }

const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  return (
    <div style={{ backgroundColor: 'white', display: 'flex' }}>
      {currentPage > 1 && (
        <Link href={createPageURL(currentPage - 1)}>Previous</Link>
      )}

      <span>
        Page: {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link href={createPageURL(currentPage + 1)}>Next</Link>
      )}
    </div>
  )
}

export default Pagination
