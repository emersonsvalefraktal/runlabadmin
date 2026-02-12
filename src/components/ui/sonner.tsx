import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#262626] group-[.toaster]:text-foreground group-[.toaster]:border-0 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:font-normal group-[.toaster]:gap-3 group-[.toaster]:px-4 group-[.toaster]:py-3",
          description: "group-[.toast]:text-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:bg-[#262626] group-[.toaster]:text-foreground",
          error: "group-[.toaster]:bg-[#262626] group-[.toaster]:text-foreground",
          warning: "group-[.toaster]:bg-[#262626] group-[.toaster]:text-foreground",
          info: "group-[.toaster]:bg-[#262626] group-[.toaster]:text-foreground",
        },
      }}
      icons={{
        success: (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-primary-foreground"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ),
        error: (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-white"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
