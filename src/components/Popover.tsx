import React, { useEffect, useState } from 'react'
import { useGetCountryDetails } from '../hooks'
import './popover.css'

interface PopoverProps {
  countryCode: string
  setIsLoadingCountryDetails: React.Dispatch<React.SetStateAction<boolean>>
  isPopoverOpen: boolean
}

type language = {
  name: string
  native: string
}

type subdivision = {
  name: string
}

export const Popover = ({
  countryCode,
  setIsLoadingCountryDetails,
  isPopoverOpen,
}: PopoverProps) => {
  const { data, loading, error } = useGetCountryDetails(countryCode)
  const countryDetails = data?.country
  if (error) console.log(error)
  // TODO: implement dropdown for many subdivisions
  const subdivisions =
    countryDetails?.states ?? countryDetails?.subdivisions ?? null

  const [altText, setAltText] = useState<string>('')
  const [imageLink, setImageLink] = useState<string>('')

  setIsLoadingCountryDetails(loading)

  useEffect(() => {
    if (isPopoverOpen) {
      const baseURI = 'https://api.unsplash.com/'
      const photosURI = '/search/photos'
      const accessKey = '4QEWFRFu7YtM-2LYhFl2J5vxbSy2Xup-QFlYOWsI-Io'
      fetch(
        `${baseURI}${photosURI}?query=${countryDetails?.name}&per_page=1&orientation=squarish&client_id=${accessKey}`
      )
        .then(response => response.json())
        .then(
          data => (
            setImageLink(data?.results[0]?.urls['small']),
            setAltText(
              data?.results[0]?.alt_description ?? data?.results[0]?.description
            )
          )
        )
    }
  }, [countryDetails?.name, isPopoverOpen])

  return (
    <dialog
      className='absolute bg-system-manila left-2/3 w-1/3 rounded-lg shadow-lg'
      id='details-popover'
    >
      <div className='flex justify-between h-20 items-center pr-4 border-b'>
        <div className='bg-system-manila-dark flex justify-center items-center shadow-md h-full w-2/3 relative rounded-md'>
          <p className='text-lg font-bold text-gray-800'>
            {`${countryDetails?.name}`}
          </p>
        </div>
        <button
          onClick={() => {
            // @ts-expect-error typescript thinks this method does not exist
            document.getElementById('details-popover')?.close()
          }}
        >
          <p className='hover:underline'>Done</p>
        </button>
      </div>
        <div className='m-2 object-fill' id='country-pic'>
          <img alt={altText} src={imageLink}></img>
        </div>
        <div className='p-4'>
          <ul className='text-gray-800'>
            <li>
              <em>Flag</em>
              {': '}
              {countryDetails?.emoji}
            </li>
            <li>
              <em>Capital city</em>
              {': '}
              {countryDetails?.capital}
            </li>
            <li>
              <em>Continent</em>
              {': '}
              {countryDetails?.continent?.name}
            </li>
            <li>
              <em>Currency</em>
              {': '}
              {countryDetails?.currency}
            </li>
            <li>
              <em>Languages</em>
            </li>
            <ul>
              {countryDetails?.languages.map(
                (language: language, index: number) => {
                  return (
                    <li className='ml-4' key={index}>
                      {`${language.name} (native: ${language.native})`}
                    </li>
                  )
                }
              )}
            </ul>
            <li>
              <em>Phone code</em>
              {': '}
              {countryDetails?.phone}
            </li>
            {subdivisions ? (
              <li>
                <em>{`Subdivisions (${subdivisions?.length})`}</em>
              </li>
            ) : null}
            <ul className='pl-4 columns-3'>
              {subdivisions?.map((subdivision: subdivision, index: number) => {
                return (
                  <li className='text-justify' key={index}>
                    {subdivision.name}
                  </li>
                )
              })}
            </ul>
          </ul>
        </div>
    </dialog>
  )
}
