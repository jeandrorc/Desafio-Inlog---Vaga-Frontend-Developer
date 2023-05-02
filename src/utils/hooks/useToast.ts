import { useState, useCallback } from "react";

export interface ToastData {
  open: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
  duration: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastData>({
    open: false,
    message: "",
    type: "success",
    duration: 2000,
  });

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "info" | "warning" | "error" = "success",
      duration: number = 2000
    ) => {
      setToast({ open: true, message, type, duration });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prevState) => ({ ...prevState, open: false }));
  }, []);

  return { toast, showToast, hideToast };
};
