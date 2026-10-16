import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../test/utils'
import Home from './Home'

function mockApi(meals) {
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => ({
    ok: true,
    json: async () =>
      url.includes('categories.php') ? { categories: [] } : { meals },
  }))
}

describe('Home', () => {
  it('busca lo que dice la URL y muestra los resultados', async () => {
    mockApi([{ idMeal: '1', strMeal: 'Tacos al pastor', strMealThumb: 't.jpg' }])
    renderWithProviders(<Home />, { route: '/?q=tacos' })

    expect(await screen.findByText('Tacos al pastor')).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('search.php?s=tacos')
    )
  })

  it('muestra un mensaje cuando la API no encuentra nada', async () => {
    mockApi(null)
    renderWithProviders(<Home />, { route: '/?q=xyz' })

    expect(
      await screen.findByText(/No se encontraron recetas/)
    ).toBeInTheDocument()
  })
})
