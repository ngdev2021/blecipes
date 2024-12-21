import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, CookingPot, List } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-playfair text-3xl font-bold text-charcoal">
            Profile Settings
          </h1>
          <Button>Save Changes</Button>
        </div>

        <div className="grid gap-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input id="display-name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="mt-1" readOnly />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cooking Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Cooking Preferences</CardTitle>
              <CardDescription>
                Customize your cooking experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                    <ChefHat className="mb-2 h-6 w-6 text-sage" />
                    <span className="text-sm font-medium">Skill Level</span>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                    <CookingPot className="mb-2 h-6 w-6 text-sage" />
                    <span className="text-sm font-medium">Preferred Cuisine</span>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col items-center rounded-lg bg-cream/30 p-4">
                    <List className="mb-2 h-6 w-6 text-sage" />
                    <span className="text-sm font-medium">Dietary Preferences</span>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select diet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;