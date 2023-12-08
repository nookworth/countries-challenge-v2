interface ListProps {
  onClick: (event: React.SyntheticEvent) => string
  emojis: string[]
  searchTerms: string[]
}

export function List({ onClick, emojis, searchTerms }: ListProps) {
  return (
    <div className='bg-gradient-to-r from-system-manila to-system-lace h-screen w-3/4 p-4'>
      <div className='flex flex-row flex-wrap'>
        {searchTerms.map((term, index) => {
          return (
            <div
              className='basis-1/4 h-28 md:h-32 lg:h-40 xl:h-44 border border-dotted shadow-sm rounded-xl m-4'
              key={index}
            >
              <div className='flex flex-col items-center relative'>
                <h3 className='text-lg font-bold text-gray-800'>{term}</h3>
                <button
                  type='button'
                  className='absolute top-12 md:top-16 lg:top-24 xl:top-28 py-3 px-4 text-sm font-semibold justify-self-end rounded-lg border hover:bg-system-navy hover:text-lime-green transition-all'
                  onClick={onClick}
                >
                  More info
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
