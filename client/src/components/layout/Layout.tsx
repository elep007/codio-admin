import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Layout({ title, description, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen gradient-bg">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title={title} description={description} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
