import { Timer, AlertTriangle } from "lucide-react";

interface Instruction {
  id: number;
  step: number;
  instruction: string;
  tip?: string;
  troubleshooting?: string;
  timer?: {
    duration: number;
  };
}

interface RecipeInstructionsProps {
  instructions: Instruction[];
}

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 font-playfair text-2xl font-semibold text-charcoal">
        Instructions
      </h2>
      <ol className="space-y-6">
        {instructions?.sort((a, b) => a.step - b.step).map((instruction) => (
          <li key={instruction.id} className="relative">
            <div className="flex gap-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-sm text-white">
                {instruction.step}
              </span>
              <div className="flex-1">
                <p>{instruction.instruction}</p>
                
                {instruction.timer && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-sage">
                    <Timer className="h-4 w-4" />
                    <span>{instruction.timer.duration} minutes</span>
                  </div>
                )}
                
                {instruction.tip && (
                  <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                    <strong className="block font-medium">Tip:</strong>
                    {instruction.tip}
                  </div>
                )}
                
                {instruction.troubleshooting && (
                  <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                    <div className="mb-1 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      <strong className="font-medium">Troubleshooting:</strong>
                    </div>
                    {instruction.troubleshooting}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};