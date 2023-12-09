import React from 'react'
import './search.css'

type SearchAll = (event: React.MouseEvent<HTMLButtonElement>) => void

type SearchOnClick = (event: React.MouseEvent<HTMLButtonElement>) => void

type SearchOnSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => void

interface SearchProps {
  onGo: SearchOnClick
  onReset: () => void
  onSubmit: SearchOnSubmit
  searchAll: SearchAll
}

export const Search = ({ onGo, onReset, onSubmit, searchAll }: SearchProps) => {
  return (
    <div className='bg-system-papaya min-h-screen w-1/4 py-4'>
      <div className='bg-system-platinum border-2 border-gray-800 rounded-lg flex flex-col gap-8 text-center justify-center items-center py-4 w-5/6 mx-auto shadow-md' id='search-box'>
        <form
          className='inline-flex flex-col gap-8 w-5/6'
          id='search-form'
          name='search-form'
          onSubmit={onSubmit}
        >
          <label htmlFor='search-form' className='font-semibold text-gray-800'>
            Search
          </label>
          <input
            type='text'
            id='search-input'
            form='search-form'
            className='bg-system-papaya py-3 px-4 block w-full border-gray-200 rounded-lg text-sm outline-none focus:outline-gray-800'
            name='search-input'
            placeholder='e.g. Brazil'
          ></input>
        </form>
        <div className='flex flex-row-reverse gap-4'>
          <button
            type='button'
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border text-gray-800 border-gray-800 hover:border-forest-green hover:text-forest-green hover:scale-105 transition-all'
            onClick={onGo}
          >
            Go
          </button>
          <button
            type='button'
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-800 hover:border-burgundy hover:text-burgundy hover:scale-105 transition-all'
            onClick={onReset}
          >
            Reset
          </button>
          <button
            type='button'
            className='py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-800 hover:border-forest-green hover:bg-forest-green hover:text-system-papaya transition-all'
            onClick={searchAll}
          >
            All
          </button>
        </div>
      </div>
    </div>
  )
}
