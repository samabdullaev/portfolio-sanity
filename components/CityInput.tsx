import {useFormValue, set, unset, type StringInputProps} from 'sanity'
import {Select} from '@sanity/ui'
import type {ChangeEvent} from 'react'

/**
 * Custom input for `placesToTravel[].city` on travelDestination.
 *
 * Reads the sibling `overview.citiesVisited` array on the same document
 * via `useFormValue` (which always takes a path from the document root,
 * regardless of how deeply this input is nested). Renders a `<Select>`
 * sourced from those city names so editors don't have to retype them.
 *
 * If the source array is empty, the dropdown is disabled with a hint —
 * editors are nudged to fill in the dependency first instead of getting
 * a confusingly empty dropdown.
 */
export function CityInput(props: StringInputProps) {
  const {elementProps, value, onChange} = props
  const cities = useFormValue(['overview', 'citiesVisited']) as string[] | undefined
  const hasCities = Array.isArray(cities) && cities.length > 0

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.currentTarget.value
    onChange(next ? set(next) : unset())
  }

  return (
    <Select
      {...elementProps}
      onChange={handleChange}
      value={value ?? ''}
      disabled={!hasCities}
    >
      <option value="">
        {hasCities ? '— Select a city —' : '— Add cities to Overview first —'}
      </option>
      {hasCities &&
        cities!.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
    </Select>
  )
}
