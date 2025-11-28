import { Atom, Landmark, Scale, Book } from "lucide-react";

export const categories = [
  {
    name: "Philosophy",
    icon: <Landmark className="h-5 w-5 text-muted-foreground" />,
  },
  {
    name: "Business",
    icon: <Scale className="h-5 w-5 text-muted-foreground" />,
  },
  {
    name: "Science",
    icon: <Atom className="h-5 w-5 text-muted-foreground" />,
  },
  {
    name: "Spiritual",
    icon: <Book className="h-5 w-5 text-muted-foreground" />,
  },
];
