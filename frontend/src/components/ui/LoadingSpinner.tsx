// src/components/ui/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);
