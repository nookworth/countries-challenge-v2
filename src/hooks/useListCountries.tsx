import { useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import { client } from '../App'

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
    }
  }
`

export const useListCountries = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client })
  return useMemo(() => ({ data, loading, error }), [data, loading, error])
}
