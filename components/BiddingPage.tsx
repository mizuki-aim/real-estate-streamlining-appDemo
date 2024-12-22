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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle, Search } from 'lucide-react'

// Mock data for bids
const bidsData = [
  { id: 1, contractor: "株式会社A建設", amount: 1500000, duration: 30, status: "審査中" },
  { id: 2, contractor: "B工務店", amount: 1650000, duration: 25, status: "審査中" },
  { id: 3, contractor: "C建設株式会社", amount: 1450000, duration: 35, status: "審査中" },
  { id: 4, contractor: "D建設工業", amount: 1550000, duration: 28, status: "審査中" },
]

export default function BiddingPage() {
  const [bids, setBids] = useState(bidsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("amount")

  const handleApprove = (id: number) => {
    setBids(bids.map(bid => 
      bid.id === id ? { ...bid, status: "承認済み" } : bid
    ))
    toast({
      title: "入札を承認しました",
      description: `入札ID ${id} を承認しました。`,
    })
  }

  const handleReject = (id: number) => {
    setBids(bids.map(bid => 
      bid.id === id ? { ...bid, status: "却下" } : bid
    ))
    toast({
      title: "入札を却下しました",
      description: `入札ID ${id} を却下しました。`,
    })
  }

  const filteredAndSortedBids = bids
    .filter(bid => 
      bid.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.amount.toString().includes(searchTerm) ||
      bid.duration.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "amount") {
        return a.amount - b.amount
      } else if (sortBy === "duration") {
        return a.duration - b.duration
      }
      return 0
    })

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">公募管理</h1>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> 新規公募作成
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>サンシャインマンション 外壁塗装工事</CardTitle>
            <CardDescription>公募ID: BID-001</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <Label htmlFor="search">検索</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="業者名、金額、工期で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sort">並び替え</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort" className="w-[180px]">
                      <SelectValue placeholder="並び替え" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amount">金額</SelectItem>
                      <SelectItem value="duration">工期</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>業者名</TableHead>
                    <TableHead>金額 (円)</TableHead>
                    <TableHead>工期 (日)</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{bid.contractor}</TableCell>
                      <TableCell>{bid.amount.toLocaleString()}</TableCell>
                      <TableCell>{bid.duration}</TableCell>
                      <TableCell>
                        <Badge variant={
                          bid.status === '承認済み' ? 'success' :
                          bid.status === '却下' ? 'destructive' :
                          'default'
                        }>
                          {bid.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {bid.status === '審査中' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => handleApprove(bid.id)}
                            >
                              承認
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(bid.id)}
                            >
                              却下
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

