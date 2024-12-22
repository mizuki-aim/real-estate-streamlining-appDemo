import { ReactNode } from 'react'
import { Home, Building, FileText, BarChart } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 bg-gray-100">
            <Home className="h-5 w-5" />
            <span>ダッシュボード</span>
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900">
            <Building className="h-5 w-5" />
            <span>物件一覧</span>
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900">
            <FileText className="h-5 w-5" />
            <span>レポート</span>
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900">
            <BarChart className="h-5 w-5" />
            <span>分析</span>
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}

