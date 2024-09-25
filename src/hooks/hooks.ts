import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";

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

// Socket events
export const useSocketEvents = (
  socket: Socket | null,
  handlers: Record<string, (data: any) => void>,
) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket?.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket?.off(event, handler);
      });
    };
  }, [socket, handlers]);
};
