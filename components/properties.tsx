import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus } from 'lucide-react'

// Mock data for properties
const properties = [
  { id: 1, name: "サンシャインマンション", address: "東京都新宿区西新宿2-8-1", units: 50, occupancyRate: 92 },
  { id: 2, name: "グリーンヒルズ", address: "東京都港区六本木6-10-1", units: 30, occupancyRate: 87 },
  { id: 3, name: "ブルーオーシャンタワー", address: "東京都中央区晴海2-5-24", units: 100, occupancyRate: 95 },
  { id: 4, name: "セントラルパークレジデンス", address: "東京都千代田区丸の内1-9-1", units: 75, occupancyRate: 98 },
  { id: 5, name: "リバーサイドヴィラ", address: "東京都江東区豊洲6-4-1", units: 40, occupancyRate: 90 },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredProperties = properties
    .filter(property => 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "occupancyRate") {
        return b.occupancyRate - a.occupancyRate
      }
      return a[sortBy].localeCompare(b[sortBy])
    })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">物件一覧</h1>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> 新規物件追加
          </Button>
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="物件名または住所で検索..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="並び替え" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">物件名</SelectItem>
              <SelectItem value="address">住所</SelectItem>
              <SelectItem value="occupancyRate">入居率</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>物件名</TableHead>
              <TableHead>住所</TableHead>
              <TableHead>総戸数</TableHead>
              <TableHead>入居率</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.units}</TableCell>
                <TableCell>{property.occupancyRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

