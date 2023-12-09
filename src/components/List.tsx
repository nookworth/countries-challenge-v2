import { useEffect, useMemo, useRef, useState } from 'react'
import './list.css'

interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  // searchTerm: string
  searchTerms: string[]
  // setSearchTerms: React.Dispatch<React.SetStateAction<string[]>>
  // setNewSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export function List({ onClick, searchTerms }: ListProps) {
  const [lastListItem, setLastListItem] = useState<string[]>([])
  function delay(currentIndex: number, maxIndex: number) {
    return new Promise((resolve, reject) => {
      if (currentIndex < maxIndex) {
        setTimeout(() => {
          resolve
        }, 500 * currentIndex)
      } else {
        reject
      }
    })
  }
  // let returnVal = ''
  if (searchTerms.length) {
    const latestSearchTerm = searchTerms[searchTerms.length - 1]?.split('')
    latestSearchTerm.map((letter, index) => {
      delay(index, latestSearchTerm.length).then(() => {
        setLastListItem([...lastListItem, letter])
      })
    })
  }
  // return returnVal

  // if (searchTerms.length) {
  //   const latestSearchTerm = searchTerms[searchTerms.length - 1]?.split('')
  //   let i = 0
  // latestSearchTerm.forEach((letter, index) => {
  // this simply outputs the name normally
  // setLatestLetter(letter)
  // new Promise(resolve =>
  //   setTimeout(() => {
  //     resolve
  //   }, 500)
  // ).then(() => {
  //   setLastListItem(lastListItem => lastListItem + letter)
  // })

  // this outputs one character infinitely
  // const timeout = setTimeout(() => {
  //   setLastListItem(lastListItem => lastListItem + letter)
  //   clearTimeout(timeout)
  // }, 500 * index)
  // })
  //   const interval = setInterval(() => {
  //     if (i === latestSearchTerm.length) {
  //       clearInterval(interval)
  //       return
  //     }
  //     setLatestLetter(latestSearchTerm[i])
  //     firstListItemVar += latestSearchTerm[i]
  //     i++
  //   }, 1000)
  // }

  // useEffect(() => {
  //   const firstListItem = document.getElementById('fist-list-item')
  //   const firstListItemButton = firstListItem?.firstChild
  //   if (firstListItemButton) {
  //     firstListItemButton.textContent = firstListItemVar
  //   }
  // }, [firstListItemVar])

  return (
    <div className='bg-system-papaya min-h-screen w-3/4 p-4'>
      {/* <div className='flex flex-row flex-wrap'>
        {searchTerms.map((term, index) => {
          return (
            <div
              className='basis-1/4 h-28 md:h-32 lg:h-40 xl:h-44 border border-system-navy border-dashed shadow-sm rounded-xl m-4'
              key={index}
            >
              <div className='flex flex-col items-center relative'>
                <h3 className='text-lg font-bold text-gray-800'>{term}</h3>
                <button
                  type='button'
                  className='absolute top-12 md:top-16 lg:top-24 xl:top-28 py-3 px-4 text-sm font-semibold justify-self-end rounded-lg border hover:bg-system-navy hover:text-system-papaya transition-all'
                  onClick={onClick}
                >
                  More info
                </button>
              </div>
            </div>
          )
        })}
      </div> */}
      <ul className='text-lg columns-3 space-y-1' id='country-list'>
        {/* <li id='first-list-item'>
          <button
            className='hover:underline hover:scale-105 transition-all'
            onClick={onClick}
          >
            {lastListItem.join('')}
          </button>
        </li> */}
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
      </ul>
    </div>
  )
}
