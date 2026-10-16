import { describe, expect, it } from 'vitest'
import { getIngredients } from './recipe'

describe('getIngredients', () => {
  it('junta ingrediente y medida e ignora los campos vacíos', () => {
    const recipe = {
      strIngredient1: 'Chicken',
      strMeasure1: '1 kg',
      strIngredient2: 'Salt',
      strMeasure2: ' pinch ',
      strIngredient3: '',
      strMeasure3: '',
      strIngredient4: null,
      strMeasure4: null,
    }

    expect(getIngredients(recipe)).toEqual([
      { name: 'Chicken', measure: '1 kg' },
      { name: 'Salt', measure: 'pinch' },
    ])
  })

  it('devuelve un array vacío si la receta no tiene ingredientes', () => {
    expect(getIngredients({})).toEqual([])
  })
})
