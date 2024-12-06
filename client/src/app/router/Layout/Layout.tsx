import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { Nav } from "@/widgets/Nav/ui/Nav";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";




export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
    <>
          <Nav />
          <Outlet />
    </>

   
     
    
  );
}
