import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";




export function LandingLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
      <>
          <Outlet/>
      </>

  );
}
