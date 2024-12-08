import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { Nav } from "@/widgets/Nav/ui/Nav";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {ProtectedRoute} from "@/shared/ui/ProtectedRoute/ProtectedRoute.tsx";




export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
      <>
          <div className="container is-fluid">
              <div className="columns">
                  <div className="column mt-4 is-narrow">
                      <Nav/>
                  </div>
                  <div className="column mt-4 is-expanded">
                  <ProtectedRoute><Outlet/></ProtectedRoute>
                  </div>
              </div>
          </div>
      </>


  );
}
