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
  const { data, loading, error } = useGetCountryDetails(countryCode)
  const countryDetails = data?.country
  if (error) console.log(error)
  // TODO: implement dropdown for many subdivisions
  const subdivisions =
    countryDetails?.states ?? countryDetails?.subdivisions ?? null

  return (
    <dialog className='absolute left-2/3 w-1/3' id='details-popover'>
      {loading ? (
        <h3>Loading country data...</h3>
      ) : (
        <>
          <div className='flex justify-between items-center py-3 px-4 border-b'>
            <h2 className='font-bold text-gray-800'>
              {`${countryDetails?.name}`}
            </h2>
            <button
              onClick={() => {
                document.getElementById('details-popover')?.close()
              }}
            >
              Done
            </button>
          </div>
          <div className='p-4'>
            <ul className='text-gray-800 dark:text-gray-400'>
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
                {subdivisions?.map(
                  (subdivision: subdivision, index: number) => {
                    return <li key={index}>{subdivision.name}</li>
                  }
                )}
              </ul>
            </ul>
          </div>
        </>
      )}
    </dialog>
  )
}
