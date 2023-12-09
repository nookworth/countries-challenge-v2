import { useGetCountryDetails } from '../hooks'
import './popover.css'

interface PopoverProps {
  countryCode: string
}

type language = {
  name: string
  native: string
}

type subdivision = {
  name: string
}

export const Popover = ({ countryCode }: PopoverProps) => {
  // TODO: refactor so country details are passesd down from App.tsx and showModal() is only called when loading is false
  const { data, loading, error } = useGetCountryDetails(countryCode)
  const countryDetails = data?.country
  if (error) console.log(error)
  // TODO: implement dropdown for many subdivisions
  const subdivisions =
    countryDetails?.states ?? countryDetails?.subdivisions ?? null

  return (
    <dialog
      className='absolute bg-system-manila left-2/3 w-1/3 rounded-lg shadow-lg'
      id='details-popover'
    >
      <>
        <div className='flex justify-between h-20 items-center pr-4 border-b'>
          <div className='bg-system-manila-dark flex justify-center items-center shadow-md h-full w-2/3 relative rounded-md'>
            {/* <span className='bg-system-manila h-1/2 w-1/4 absolute rounded-bl-md top-0 right-0 shadow-none'></span> */}
            <p className='text-lg font-bold text-gray-800'>
              {`${countryDetails?.name}`}
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById('details-popover')?.close()
            }}
          >
            <p className='hover:underline'>Done</p>
          </button>
        </div>
        <div className='p-4'>
          <ul className='text-gray-800'>
            <li>
              <u>Flag</u>
              {': '}
              {countryDetails?.emoji}
            </li>
            <li>
              <u>Capital city</u>
              {': '}
              {countryDetails?.capital}
            </li>
            <li>
              <u>Continent</u>
              {': '}
              {countryDetails?.continent?.name}
            </li>
            <li>
              <u>Currency</u>
              {': '}
              {countryDetails?.currency}
            </li>
            <li>
              <u>Languages</u>
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
              <u>Phone code</u>
              {': '}
              {countryDetails?.phone}
            </li>
            {subdivisions ? (
              <li>
                <u>{`Subdivisions (${subdivisions?.length})`}</u>
              </li>
            ) : null}
            <ul className='pl-4 columns-3'>
              {subdivisions?.map((subdivision: subdivision, index: number) => {
                return <li key={index}>{subdivision.name}</li>
              })}
            </ul>
          </ul>
        </div>
      </>
    </dialog>
  )
}
