import { ModeToggle } from "@/components/mode-toggle";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-4 py-2 sm:py-2 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Sigma Tender Management. All Rights
          Reserved.
        </p>
        <div className="flex space-x-4 items-center justify-center sm:flex-row space-y-2 sm:space-y-0">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Designed and developed by{" "}
            <a
              href="https://www.chiralitylabs.com/"
              className="underline font-semibold"
            >
              Chirality Labs
            </a>
            .
          </p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
