import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'
import { renderWithProviders } from './test/utils'

describe('App', () => {
  it('muestra la página 404 en una ruta que no existe', () => {
    renderWithProviders(<App />, { route: '/esto-no-existe' })

    expect(
      screen.getByRole('heading', { name: 'En esta olla no hay nada' })
    ).toBeInTheDocument()
  })

  it('cambia el idioma a inglés', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />, { route: '/esto-no-existe' })

    await user.click(screen.getByRole('button', { name: 'en' }))

    expect(
      screen.getByRole('heading', { name: "There's nothing in this pot" })
    ).toBeInTheDocument()
  })
})
