function RecipeCardSkeleton() {
  return (
    <li className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="h-52 w-full bg-surface-high" />
      <div className="p-4">
        <div className="h-5 w-3/4 rounded bg-surface-high" />
        <div className="mt-6 h-3 w-1/3 rounded bg-surface-high" />
      </div>
    </li>
  );
}

export default RecipeCardSkeleton;