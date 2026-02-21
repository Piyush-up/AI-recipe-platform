import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "./ui/card";

function RecipeCard({ recipe, variant = "default" }) {
  console.log(recipe);

  const getRecipeData = () => {
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };
    }

    // more conditions

    return {};
  };

  const { title, image, href, showImage } = getRecipeData(); // getting data from above

  if (variant === "grid") {
    return (
      <Link href={href}>
        <Card className="rounded-none overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0">
          {/* Image */}
          {showImage ? (
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <CardHeader>
            <CardTitle className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2">
              {title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }
  return <div>RecipeCard</div>;
}

export default RecipeCard;
