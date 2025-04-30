import { Truck, Grid3X3, PaintBucket, Pipette, Wrench, Home, Zap, Shield } from "lucide-react"

interface MobileCategoryDropdownProps {
  onClose?: () => void
}

export default function MobileCategoryDropdown({ onClose }: MobileCategoryDropdownProps) {
  const categories = [
    {
      name: "Cement and Aggregates",
      icon: <Truck className="h-5 w-5 text-blue-600" />,
      subcategories: ["PPC Cement", "OPC", "Sand", "Stone", "Blocks", "Gravel(00, 02)"],
    },
    {
      name: "Tiles and flooring",
      icon: <Grid3X3 className="h-5 w-5 text-blue-600" />,
      subcategories: ["Ceramic", "Porcelain", "Vitrified", "Marble", "Granite"],
    },
    {
      name: "Paints and Coatings",
      icon: <PaintBucket className="h-5 w-5 text-blue-600" />,
      subcategories: ["Emulsion", "Enamel", "Distemper", "Primer"],
    },
    {
      name: "Pipes and Plumbing",
      icon: <Pipette className="h-5 w-5 text-blue-600" />,
      subcategories: ["uPVC", "HDPE (PE100)", "GI", "PVC"],
    },
    {
      name: "Tools(Hand and power)",
      icon: <Wrench className="h-5 w-5 text-blue-600" />,
      subcategories: ["Hammers", "Drills", "Wrenches", "Power Tools"],
    },
    {
      name: "Roofing Materials",
      icon: <Home className="h-5 w-5 text-blue-600" />,
      subcategories: ["Galvanized", "Tile Roof", "Metal Sheets", "Insulation"],
    },
    {
      name: "Electrical Equipment",
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      subcategories: ["Wires", "Switches", "Conduits", "Fixtures"],
    },
    {
      name: "Safety Equipment",
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      subcategories: ["Helmets", "Gloves", "Vests", "Goggles"],
    },
  ]

  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto">
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="pb-4">
            <div className="flex items-center mb-2">
              <div className="mr-3">{category.icon}</div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="pl-8 space-y-2">
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="text-sm text-gray-600">
                  {subcategory}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
