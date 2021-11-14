import { useState, useEffect, ChangeEventHandler } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { QueryStatus, searchPlants } from '@api'
import { Layout } from '@components/Layout'
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@ui/FormField'
import { SearchIcon } from '@ui/icon/Search'
import { Typography } from '@ui/Typography'
import { PlantCollection } from '@components/PlantCollection'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale!),
})

const Search = () => {
  const { t } = useTranslation(['page-search'])
  const [term, setTerm] = useState('')
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [results, setResults] = useState<Plant[]>([])

  const searchTerm = useDebounce(term, 500)

  const updateTerm: ChangeEventHandler<HTMLInputElement> = (e) =>
    setTerm(e.currentTarget.value)

  const emptyResults = status === 'success' && results.length === 0

  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setStatus('idle')
      setResults([])
      return
    }

    setStatus('loading')

    // Pagination not supported ... yet
    searchPlants({ term: searchTerm, limit: 10 }).then((data) => {
      setResults(data)
      setStatus('success')
    })
  }, [searchTerm])

  return (
    <Layout>
      <main className="pt-16 text-center">
        <div className="max-w-5xl mx-auto mb-6">
          <FormControl fullWidth className="" variant="outlined">
            <InputLabel htmlFor="search-term-field">{t('term')}</InputLabel>
            <OutlinedInput
              id="search-term-field"
              value={term}
              onChange={updateTerm}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
        </div>
        <div>
          {emptyResults ? (
            <Typography variant="body1">{t('notFound', { term })}</Typography>
          ) : (
            <PlantCollection plants={results} variant="square" />
          )}
        </div>
      </main>
    </Layout>
  )
}

function useDebounce<T>(value: T, wait = 0): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, wait)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value])

  return debouncedValue
}

export default Search
