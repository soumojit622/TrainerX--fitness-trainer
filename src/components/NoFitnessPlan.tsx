import Link from "next/link";
import CornerElements from "./CornerElements";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const NoFitnessPlan = () => {
  return (
    <div className="relative mb-10 backdrop-blur-md border border-border p-10 rounded-lg shadow-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/20 text-center">
      <CornerElements />

      {/* Optional background glow effect */}
      <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-primary/20 blur-3xl opacity-20" />

      <h2 className="text-3xl font-semibold mb-4 tracking-tight text-primary">
        No <span className="text-foreground">Fitness Plans</span> Yet
      </h2>

      <p className="text-muted-foreground font-mono mb-6 max-w-md mx-auto text-base leading-relaxed">
        Start by creating a personalized fitness and diet plan tailored to your specific goals and needs
      </p>

      <Button
        size="lg"
        asChild
        className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        <Link href="/generate-program">
          <span className="relative flex items-center gap-2">
            Create Your First Plan
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default NoFitnessPlan;
