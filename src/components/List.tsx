import { useEffect, useRef, useState } from 'react'
import './list.css'

interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  searchTerms: string[]
}

export function List({ onClick, searchTerms }: ListProps) {
  const [lastItem, setLastItem] = useState<string>('')
  const [hasSearchTermBeenRendered, setHasSearchTermBeenRendered] =
    useState<boolean>(false)
  const [wordBuilder, setWordBuilder] = useState<string[]>([])
  const searchTerm = searchTerms[searchTerms.length - 1] ?? ''
  const iterator = useRef(0)

  useEffect(() => {
    function typeLetters() {
      if (iterator.current === searchTerm.length + 1) {
        iterator.current = 0
        setWordBuilder([])
        setLastItem('')
        setHasSearchTermBeenRendered(true)
        return
      }
      const searchTermArr = searchTerm?.split('')

      const interval = setInterval(() => {
        setWordBuilder([...wordBuilder, searchTermArr[iterator.current]]),
          setLastItem(wordBuilder.join('')),
          (iterator.current += 1),
          clearInterval(interval)
      }, 75)
    }

    searchTerm && !hasSearchTermBeenRendered && typeLetters()

  }, [hasSearchTermBeenRendered, lastItem, searchTerm, wordBuilder])

  useEffect(() => {
    setHasSearchTermBeenRendered(false)
  }, [searchTerms])

  return (
    <div className='bg-system-papaya min-h-screen w-3/4 p-4'>
      <ul className='text-lg columns-2 lg:columns-3 space-y-1' id='country-list'>
        {hasSearchTermBeenRendered
          ? searchTerms.map((term, index) => {
              return (
                <li key={index}>
                  <button
                    className='hover:underline hover:scale-105 hover:text-deep-ocean-blue transition-all'
                    onClick={onClick}
                  >
                    <p className='text-left'>{term}</p>
                  </button>
                </li>
              )
            })
          : searchTerms.slice(0, searchTerms.length - 1).map((term, index) => {
              return (
                <li key={index}>
                  <button
                    className='hover:underline hover:scale-105 hover:text-deep-ocean-blue transition-all'
                    onClick={onClick}
                  >
                    <p className='text-left'>{term}</p>
                  </button>
                </li>
              )
            })}
        <li id='last-list-item'>
          <button
            className='hover:underline hover:scale-105 transition-all'
            id='last-list-item-button'
            onClick={onClick}
          >
            {lastItem}
          </button>
        </li>
      </ul>
    </div>
  )
}
