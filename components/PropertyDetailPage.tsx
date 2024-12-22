import { useState } from 'react'
import { useRouter } from 'next/router'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Building, Users, DollarSign, FileText, Camera } from 'lucide-react'

// Mock data for a specific property
const propertyData = {
  id: 1,
  name: "サンシャインマンション",
  address: "東京都新宿区西新宿2-8-1",
  totalUnits: 50,
  occupancyRate: 92,
  averageRent: 150000,
  constructionYear: 2010,
  lastInspection: "2023-05-15",
  units: [
    { id: 101, number: "101", status: "occupied", tenant: "山田太郎", rentAmount: 145000 },
    { id: 102, number: "102", status: "vacant", tenant: null, rentAmount: 150000 },
    { id: 103, number: "103", status: "occupied", tenant: "佐藤花子", rentAmount: 155000 },
    { id: 201, number: "201", status: "occupied", tenant: "鈴木一郎", rentAmount: 160000 },
    { id: 202, number: "202", status: "occupied", tenant: "田中美咲", rentAmount: 158000 },
  ]
}

export default function PropertyDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [activeTab, setActiveTab] = useState("overview")

  // In a real application, you would fetch the property data based on the id
  // For now, we'll use the mock data

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{propertyData.name}</h1>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            編集
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{propertyData.address}</CardTitle>
            <CardDescription>物件ID: {propertyData.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">総戸数</p>
                  <p className="text-2xl font-bold">{propertyData.totalUnits}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">入居率</p>
                  <p className="text-2xl font-bold">{propertyData.occupancyRate}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">平均賃料</p>
                  <p className="text-2xl font-bold">¥{propertyData.averageRent.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">築年数</p>
                  <p className="text-2xl font-bold">{new Date().getFullYear() - propertyData.constructionYear}年</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="units">区画一覧</TabsTrigger>
            <TabsTrigger value="reports">レポート</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>物件概要</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">築年月</dt>
                    <dd className="text-lg">{propertyData.constructionYear}年</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">最終点検日</dt>
                    <dd className="text-lg">{propertyData.lastInspection}</dd>
                  </div>
                  {/* Add more property details as needed */}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="units">
            <Card>
              <CardHeader>
                <CardTitle>区画一覧</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>部屋番号</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>入居者</TableHead>
                      <TableHead>賃料</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propertyData.units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>{unit.number}</TableCell>
                        <TableCell>{unit.status === 'occupied' ? '入居中' : '空室'}</TableCell>
                        <TableCell>{unit.tenant || '-'}</TableCell>
                        <TableCell>¥{unit.rentAmount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>レポート</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="mr-2 h-4 w-4" />
                    退去立会レポート作成
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    定期点検レポート作成
                  </Button>
                  {/* Add more report types as needed */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

