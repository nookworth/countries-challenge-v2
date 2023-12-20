import React, { useRef, useState } from 'react'
import { Search } from './components/Search'
import { List } from './components/List'
import { Popover } from './components/Popover'
import { Header } from './components/Header'
import { useListCountries } from './hooks/'
import { ApolloClient, InMemoryCache } from '@apollo/client'

type country = {
  name: string
  code: string
  emoji: string
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
})

export const App = () => {
  const [emojis, setEmojis] = useState<string[]>([])
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const [countryCode, setCountryCode] = useState<string>('US')
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const modalRef = useRef(null)
  const searchInputRef = useRef(null)
  // TODO: loading and error messages
  const { data } = useListCountries()
  const countriesData = data?.countries

  function formatSearchTerm(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase()
    const matchingCountry = countriesData?.find((country: country) => {
      return country.name.toLowerCase() === lowerCaseSearchTerm
    })
    return matchingCountry
      ? matchingCountry.name
      : new Error('Search term is not a valid country name')
  }

  function onClickCountry(event: React.SyntheticEvent) {
    const countryName =
      event.currentTarget.parentElement?.firstChild?.textContent
    const matchingCountry = countriesData.find((country: country) => {
      return country.name === countryName
    })
    const countryCode = matchingCountry?.code
    setCountryCode(countryCode)

    // @ts-expect-error typescript doesn't like this
    modalRef.current.showModal()
    setIsPopoverOpen(true)
    return countryCode
  }

  function onGo(event: React.MouseEvent<HTMLButtonElement>) {
    // @ts-expect-error typescript doesn't like this
    const searchTerm = searchInputRef.current.value
    const matchingCountry = countriesData?.find((country: country) => {
      return formatSearchTerm(searchTerm) === country.name
    })
    const emoji = matchingCountry?.emoji

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      setEmojis([...emojis, emoji])
      // @ts-expect-error typescript doesn't like this
      searchInputRef.current.value = ''
      return
    } else {
      window.alert(
        'Please enter a valid country name that you have not already searched for.'
      )
    }
  }

  function onReset() {
    setEmojis([])
    setSearchTerms([])
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // @ts-expect-error typescript doesn't like this
    const searchTerm = searchInputRef.current.value
    const matchingCountry = countriesData?.find((country: country) => {
      return formatSearchTerm(searchTerm) === country.name
    })
    const emoji = matchingCountry?.emoji

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      setEmojis([...emojis, emoji])
      // @ts-expect-error typescript doesn't like this
      searchInputRef.current.value = ''
      return
    } else {
      window.alert(
        'Please enter a valid country name that you have not already searched for.'
      )
    }
  }

  function searchAll() {
    const allCountries = countriesData.map((country: country) => {
      return country.name
    })
    setSearchTerms(allCountries)
  }

  // TODO: allow users to search for a list of comma-separated countries
  function validateSearchTerm(searchTerm: string) {
    const isValidCountry = data?.countries.some((country: country) => {
      return searchTerm.trim().match(new RegExp(`\\b${country.name}\\b`, 'i'))
    })
    const hasNotBeenSeareched = !searchTerms.includes(
      formatSearchTerm(searchTerm)
    )
    return isValidCountry && hasNotBeenSeareched
  }

  return (
    <>
      <Header />
      <main className='flex flex-row bg-system-papaya'>
        <Search
          onGo={onGo}
          onReset={onReset}
          onSubmit={onSubmit}
          ref={searchInputRef}
          searchAll={searchAll}
        />
        <List
          onClick={onClickCountry}
          searchTerms={searchTerms}
        />
        <Popover
          countryCode={countryCode}
          isPopoverOpen={isPopoverOpen}
          ref={modalRef}
        />
      </main>
    </>
  )
}
