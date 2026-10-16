import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../test/utils'
import FavoriteButton from './FavoriteButton'

const recipe = { idMeal: '1', strMeal: 'Tacos', strMealThumb: 'tacos.jpg' }

describe('FavoriteButton', () => {
  it('agrega la receta a favoritos y la guarda en localStorage', async () => {
    const user = userEvent.setup()
    renderWithProviders(<FavoriteButton recipe={recipe} />)

    const button = screen.getByRole('button', { name: 'Agregar a favoritos' })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)

    expect(
      screen.getByRole('button', { name: 'Quitar de favoritos' })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(JSON.parse(localStorage.getItem('favorites'))).toEqual([recipe])
  })

  it('la quita al pulsar otra vez', async () => {
    const user = userEvent.setup()
    renderWithProviders(<FavoriteButton recipe={recipe} />)

    await user.click(screen.getByRole('button', { name: 'Agregar a favoritos' }))
    await user.click(screen.getByRole('button', { name: 'Quitar de favoritos' }))

    expect(JSON.parse(localStorage.getItem('favorites'))).toEqual([])
  })
})
