import { Button } from "@/components/ui/button";
import { CarouselDemo } from "@/components/demo/carouseldemo";

export default function Root() {
  return (
    <>
      <div className="flex justify-center">
    <Button>Test knapp med shadcn</Button>
      </div>
    <div className="flex justify-center pt-5">
    <CarouselDemo></CarouselDemo>

    </div>
    </>
  );
}
