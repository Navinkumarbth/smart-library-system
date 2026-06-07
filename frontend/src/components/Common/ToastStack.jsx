import { useToast } from "../../context/ToastContext.jsx";

function ToastStack() {
  const toast = useToast();

  if (!toast?.toasts?.length) return null;

  return (
    <div className="fixed top-4 right-4 z-100 space-y-2 w-[min(92vw,360px)]">
      {toast.toasts.map((item) => (
        <div
          key={item.id}
          className={`rounded-lg border px-4 py-3 shadow-lg text-sm backdrop-blur ${item.type === "success"
            ? "border-green-200 bg-green-50 text-green-800"
            : item.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-gray-200 bg-white text-gray-800"
            }`}
        >
          {item.message}
        </div>
      ))}
    </div>
  );
}

export default ToastStack;
