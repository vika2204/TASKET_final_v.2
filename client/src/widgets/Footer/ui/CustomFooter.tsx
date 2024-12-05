import { Layout } from "antd";

const { Footer } = Layout;

export function CustomFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#2c3e50",
        color: "#fff",
        padding: "16px 0",
      }}
    >
      {new Date().getFullYear()} © Your Company Name
    </Footer>
  );
}
