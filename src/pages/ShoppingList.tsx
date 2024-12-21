import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShoppingList = () => {
  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Shopping List
          </h1>
          <div className="flex gap-4">
            <Button variant="outline">Clear Completed</Button>
            <Button>Add Item</Button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* Add Item Form */}
          <div className="mb-8 grid gap-4 rounded-lg border p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="produce">Produce</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="pantry">Pantry</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" className="mt-1" min="1" />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">pieces</SelectItem>
                    <SelectItem value="grams">grams</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="liters">liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Shopping List */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="space-y-4">
              <h2 className="font-playfair text-xl font-semibold text-charcoal">
                Produce
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <Checkbox id="item-1" />
                  <Label htmlFor="item-1" className="flex-1">
                    Tomatoes
                  </Label>
                  <span className="text-sm text-gray-600">2 pieces</span>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <Checkbox id="item-2" />
                  <Label htmlFor="item-2" className="flex-1">
                    Onions
                  </Label>
                  <span className="text-sm text-gray-600">3 pieces</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-playfair text-xl font-semibold text-charcoal">
                Dairy
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <Checkbox id="item-3" />
                  <Label htmlFor="item-3" className="flex-1">
                    Milk
                  </Label>
                  <span className="text-sm text-gray-600">1 liter</span>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <Checkbox id="item-4" />
                  <Label htmlFor="item-4" className="flex-1">
                    Cheese
                  </Label>
                  <span className="text-sm text-gray-600">200 grams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;