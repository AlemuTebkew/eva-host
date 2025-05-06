import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Category } from "@/types/category";  // Assuming Category type is defined elsewhere in your project
import Image from "next/image";

interface CategoryNavigationProps {
  data: Category[];  // Array of Category objects
  selectedCategory: Category | null;  // The currently selected category or null if no category is selected
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;  // Function to update the selected category
}

const icons = [
  "https://cdn-icons-png.flaticon.com/512/2903/2903951.png",
  "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  "https://cdn-icons-png.flaticon.com/512/3045/3045801.png",
  "https://cdn-icons-png.flaticon.com/512/1375/1375211.png",
  "https://cdn-icons-png.flaticon.com/512/5284/5284351.png",
];

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ data, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full flex h-96 flex-col">
      {/* Main Categories */}
      <ScrollArea className="overflow-x-auto no-scrollbar border-b">
        <div className="flex gap-4 py-2 px-4 whitespace-nowrap">
          {data?.map((category, index) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`flex flex-col items-center justify-center min-w-[100px] px-2 py-1 cursor-pointer transition ${
                selectedCategory?.id === category.id ? "border-b-2 border-black" : ""
              }`}
            >
              {/* Category Icon */}
              <Image
                src={category.image || icons[index % icons.length]}
                alt={category.name}
                width={24}
                height={24}
                className="mb-1"
              />
              <span className="text-xs">{category.name}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Subcategories */}
      {selectedCategory && selectedCategory.subCategories.length > 0 && (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-4">
            {selectedCategory.subCategories.map((sub, index) => (
              <Link
                key={sub.id}
                href={`/search?categoryId=${selectedCategory.id}&&subCategoryId=${sub.id}`}
                className="text-center cursor-pointer hover:bg-gray-100 p-4"
              >
                {/* Subcategory Icon */}
                <img
                  src={icons[index % icons.length]}
                  alt={sub.name}
                  className="h-6 w-6 mb-2 mx-auto"
                />
                <h4 className="font-semibold text-gray-700">{sub.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNavigation;
