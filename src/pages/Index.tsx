import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "ON:You", url: "https://onyou.onhq.net" },
  { name: "ON:Me", url: "https://me.onhq.net" },
  { name: "OpenChat", url: "https://ai.onhq.net" },
  { name: "ON:QR", url: "https://qr.onhq.net" },
];

const Index = () => {
  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      <h1 className="flex flex-col text-center font-black leading-[0.8] tracking-tighter text-foreground select-none md:flex-row">
        <span className="text-[45vw] md:text-[32vw]">ON</span>
        <span className="text-[45vw] md:text-[32vw]">HQ</span>
      </h1>
      
      <nav className="mt-8 flex flex-wrap justify-center gap-3 md:gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base"
          >
            {project.name}
          </a>
        ))}
      </nav>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          asChild
        >
          <a href="mailto:hello@onhq.dev">
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Contact
          </a>
        </Button>
      </div>
    </main>
  );
};

export default Index;
