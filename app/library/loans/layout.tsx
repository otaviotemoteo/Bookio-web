import  Sidebar  from '../../../components/library/layout/sidebar';
import  Header  from '../../../components/library/layout/header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function LoansLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName="Bibliotecário" />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}