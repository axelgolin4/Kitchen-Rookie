

export function getIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`]?.trim();
    const measure = recipe[`strMeasure${i}`]?.trim() ?? "";
    if (name) ingredients.push({ name, measure });
  }
  return ingredients;
}

