import { refreshAccessToken } from "@/entities/user/model/userThunk";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { CustomFooter } from "@/widgets";
import { Nav } from "@/widgets/Nav/ui/Nav";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";

const { Content } = AntLayout;

export function Layout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
    <AntLayout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Nav />
      <Content style={{ flex: "1" }}>
        <Outlet />
      </Content>
      <CustomFooter />
    </AntLayout>
  );
}
