import React from 'react'
import { useState } from 'react'
import './App.css'
import { Search } from './components/Search'
import { List } from './components/List'
import { useListCountries } from './hooks/'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Popover } from './components/Popover'
import { Header } from './components/Header'

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
  // const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  // TODO: loading and error messages
  const { data } = useListCountries()
  const countriesData = data?.countries

  // TODO: handle multi-word country names
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
    const popover = document.getElementById('details-popover')
    // @ts-expect-error typescript doesn't like this
    popover?.showModal()
    return countryCode
  }

  function onGo(event: React.MouseEvent<HTMLButtonElement>) {
    // @ts-expect-error typescript doesn't like this
    const searchTerm = document.getElementById('search-input').value
    const matchingCountry = countriesData?.find((country: country) => {
      return formatSearchTerm(searchTerm) === country.name
    })
    const emoji = matchingCountry?.emoji

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      setEmojis([...emojis, emoji])
      // @ts-expect-error typescript doesn't like this
      document.getElementById('search-input').value = ''
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
    const searchTerm = event.currentTarget.elements['search-input'].value
    const matchingCountry = countriesData?.find((country: country) => {
      return formatSearchTerm(searchTerm) === country.name
    })
    const emoji = matchingCountry?.emoji

    event.preventDefault()

    if (validateSearchTerm(searchTerm)) {
      setSearchTerms([...searchTerms, formatSearchTerm(searchTerm)])
      setEmojis([...emojis, emoji])
      // @ts-expect-error typescript doesn't like this
      event.currentTarget.elements['search-input'].value = ''
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
          searchAll={searchAll}
        />
        <List onClick={onClickCountry} searchTerms={searchTerms} />
        <Popover countryCode={countryCode} />
      </main>
    </>
  )
}
