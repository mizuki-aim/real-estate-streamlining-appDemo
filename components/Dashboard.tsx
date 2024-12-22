import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            ダッシュボード編集
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総物件数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">895</div>
              <p className="text-xs text-muted-foreground">
                前月比 +2.3%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均賃料</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥198,630</div>
              <p className="text-xs text-muted-foreground">
                前月比 +0.5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">入居率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                目標 95%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">未対応案件</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                前週比 -2
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>最近のアクティビティ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">退去調査が必要です</p>
                  <p className="text-sm text-gray-500">本日 EOB までに完了してください</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  10:52 AM
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-pink-100 p-2">
                  <Building className="h-4 w-4 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium">新規物件が追加されました</p>
                  <p className="text-sm text-gray-500">バンブーマンション 301号室</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  09:30 AM
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

