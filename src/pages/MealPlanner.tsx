import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CookingPot } from "lucide-react";

const MealPlanner = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Meal Planner
          </h1>
          <Button>Generate Meal Plan</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {days.map((day) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
                <CardDescription>Plan your meals for {day}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Breakfast */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Breakfast</h3>
                      <Button variant="ghost" size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-cream/30 p-3">
                      <CookingPot className="h-4 w-4 text-sage" />
                      <span className="text-sm">No meal planned</span>
                    </div>
                  </div>

                  {/* Lunch */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Lunch</h3>
                      <Button variant="ghost" size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-cream/30 p-3">
                      <CookingPot className="h-4 w-4 text-sage" />
                      <span className="text-sm">No meal planned</span>
                    </div>
                  </div>

                  {/* Dinner */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Dinner</h3>
                      <Button variant="ghost" size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-cream/30 p-3">
                      <CookingPot className="h-4 w-4 text-sage" />
                      <span className="text-sm">No meal planned</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;