import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, MapPin, Calendar, User } from 'lucide-react'

// Mock data for the report
const reportData = {
  id: "RPT-001",
  propertyName: "サンシャインマンション",
  address: "東京都新宿区西新宿2-8-1",
  date: "2023-06-15",
  inspector: "山田太郎",
  type: "退去立会",
  items: [
    {
      id: 1,
      location: "リビング",
      issue: "壁に傷あり",
      status: "要修繕",
      photo: "/placeholder.svg?height=200&width=200",
      comment: "引っ越し時の家具による傷と思われます。補修が必要です。"
    },
    {
      id: 2,
      location: "キッチン",
      issue: "シンクの水漏れ",
      status: "要交換",
      photo: "/placeholder.svg?height=200&width=200",
      comment: "シンクの下の配管から水漏れが確認されました。早急な交換が必要です。"
    },
    {
      id: 3,
      location: "浴室",
      issue: "タイルのひび割れ",
      status: "要観察",
      photo: "/placeholder.svg?height=200&width=200",
      comment: "浴室床のタイルに軽微なひび割れがあります。現時点では問題ありませんが、経過観察が必要です。"
    },
    {
      id: 4,
      location: "寝室",
      issue: "クローゼットの扉が緩い",
      status: "軽微な修繕",
      photo: "/placeholder.svg?height=200&width=200",
      comment: "クローゼットの扉の蝶番が緩んでいます。調整または交換が必要です。"
    }
  ]
}

export default function ReportPage() {
  const [selectedItem, setSelectedItem] = useState(reportData.items[0])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">レポート詳細</h1>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            PDFダウンロード
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{reportData.propertyName}</CardTitle>
            <CardDescription>レポートID: {reportData.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">住所</p>
                  <p className="text-sm text-gray-500">{reportData.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">日付</p>
                  <p className="text-sm text-gray-500">{reportData.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">検査者</p>
                  <p className="text-sm text-gray-500">{reportData.inspector}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">タイプ</p>
                  <p className="text-sm text-gray-500">{reportData.type}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>検査項目</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-350px)]">
                <div className="space-y-4">
                  {reportData.items.map((item) => (
                    <Button
                      key={item.id}
                      variant="outline"
                      className={`w-full justify-start ${selectedItem.id === item.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.location}</span>
                        <span className="text-sm text-gray-500">{item.issue}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{selectedItem.location}</CardTitle>
              <CardDescription>{selectedItem.issue}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="photo" className="w-full">
                <TabsList>
                  <TabsTrigger value="photo">写真</TabsTrigger>
                  <TabsTrigger value="comment">コメント</TabsTrigger>
                </TabsList>
                <TabsContent value="photo">
                  <div className="aspect-video relative">
                    <img
                      src={selectedItem.photo}
                      alt={selectedItem.issue}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="comment">
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p>{selectedItem.comment}</p>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-4">
                <Badge variant={
                  selectedItem.status === '要修繕' ? 'destructive' :
                  selectedItem.status === '要交換' ? 'destructive' :
                  selectedItem.status === '要観察' ? 'warning' :
                  'default'
                }>
                  {selectedItem.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

