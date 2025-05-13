import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  actionButton?: {
    label: string;
    onClick: () => void;
    className?: string;
  };
}

const statusStyles = {
  success: {
    title: "text-green-700",
    button: "bg-green-800 hover:bg-green-900 text-white",
    icon: "✓",
  },
  error: {
    title: "text-red-700",
    button: "bg-red-800 hover:bg-red-900 text-white",
    icon: "!",
  },
  info: {
    title: "text-blue-700",
    button: "bg-blue-800 hover:bg-blue-900 text-white",
    icon: "i",
  },
  warning: {
    title: "text-yellow-700",
    button: "bg-yellow-800 hover:bg-yellow-900 text-white",
    icon: "!",
  },
};

export function StatusDialog({
  isOpen,
  onClose,
  title,
  message,
  type,
  actionButton,
}: StatusDialogProps) {
  if (!isOpen) return null;

  const styles = statusStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              type === "success" && "bg-green-100",
              type === "error" && "bg-red-100",
              type === "info" && "bg-blue-100",
              type === "warning" && "bg-yellow-100",
            )}
          >
            <span
              className={cn(
                "text-2xl font-bold",
                type === "success" && "text-green-700",
                type === "error" && "text-red-700",
                type === "info" && "text-blue-700",
                type === "warning" && "text-yellow-700",
              )}
            >
              {styles.icon}
            </span>
          </div>
        </div>
        <h2 className={cn("mb-4 text-2xl font-bold", styles.title)}>{title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              className={cn(styles.button, actionButton.className)}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
