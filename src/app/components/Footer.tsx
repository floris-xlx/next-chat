import { Github } from "lucide-react";


export default function Footer() {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/floris-xlx/next-chat"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Github size={16} />
                Go to github
            </a>
        </footer>
    );
}
