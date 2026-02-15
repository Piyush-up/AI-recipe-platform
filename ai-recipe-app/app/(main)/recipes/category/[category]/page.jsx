"use client";

import { getMealsByCategory } from "@/actions/mealdb.actions";
import RecipeGrid from "@/components/RecipeGrid";
import { useParams } from "next/navigation";

function CategoryRecipesPage() {
  const { category } = useParams();

  return (
    <RecipeGrid
      type="category"
      value={category}
      fetchAction={getMealsByCategory}
      backLink="/dashboard"
    />
  );
}

export default CategoryRecipesPage;
