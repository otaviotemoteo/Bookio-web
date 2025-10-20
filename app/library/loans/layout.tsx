import  Sidebar  from '../../../components/library/layout/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LoansLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}