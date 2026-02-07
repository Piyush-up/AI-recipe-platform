import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-300 text-stone-900">
      <section className="pt-32 pb-20 px-4">
        <Button variant="destructive">Destructuve</Button>
      </section>
    </div>
  );
}
