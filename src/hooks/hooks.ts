import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

//

export const useErrors = (
  errors: Array<{ isError: boolean; error?: any; fallback?: () => void }> = [],
) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};
