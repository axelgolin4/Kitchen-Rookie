import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { FavoritesProvider } from '../context/FavoritesProvider'
import { LanguageProvider } from '../context/LanguageProvider'

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>
        <FavoritesProvider>{ui}</FavoritesProvider>
      </LanguageProvider>
    </MemoryRouter>
  )
}
