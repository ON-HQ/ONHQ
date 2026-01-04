import { Mail, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <h1 className="text-[20vw] font-black leading-none tracking-tighter text-foreground select-none md:text-[18vw] lg:text-[16vw]">
        ONHQ
      </h1>
      
      <nav className="mt-12 flex gap-4">
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <a href="mailto:hello@onhq.dev">
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          asChild
        >
          <a href="/projects">
            <FolderOpen className="h-4 w-4" />
            Projects
          </a>
        </Button>
      </nav>
    </main>
  );
};

export default Index;
