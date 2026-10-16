import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../test/utils'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('envía el texto sin espacios sobrantes', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    renderWithProviders(<SearchBar onSearch={onSearch} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Buscar receta' }),
      '  tacos  '
    )
    await user.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onSearch).toHaveBeenCalledWith('tacos')
  })
})
