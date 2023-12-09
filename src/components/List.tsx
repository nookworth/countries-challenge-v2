import { useRef, useState } from 'react'
import './list.css'

interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  searchTerm: string
  searchTerms: string[]
  // setSearchTerms: React.Dispatch<React.SetStateAction<string[]>>
  // setNewSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

interface RefFunction {
  (setState: React.SetStateAction<string[]>, index: number): NodeJS.Timeout
}

export function List({ onClick, searchTerm, searchTerms }: ListProps) {
  // const timerRef = useRef<RefFunction>(refFunction)
  // const [lastItem, setLastItem] = useState<string[]>([])
  // const searchTermArr = searchTerm.split('')
 
  // function refFunction (
  //   setState: React.SetStateAction<string[]>,
  //   index: number
  // ) {
  //   const timer = setTimeout(() => {
  //     setState
  //   }, 500*index)
  //   return timer
  // }

  // if (searchTerm) {for (let i = 0; i < searchTerm.length; i++) {
  //   timerRef.current = refFunction(
  //     setLastItem([...lastItem, searchTermArr[i]]),
  //     i
  //   )
  //   timerRef.current()
  // }}
  

  return (
    <div className='bg-system-papaya min-h-screen w-3/4 p-4'>
      <ul className='text-lg columns-3 space-y-1' id='country-list'>
        {searchTerms.map((term, index) => {
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
        {/* <li id='first-list-item'>
          <button
            className='hover:underline hover:scale-105 transition-all'
            id='first-list-item-button'
            onClick={onClick}
          >
            {lastItem.join('')}
          </button>
        </li> */}
      </ul>
    </div>
  )
}
