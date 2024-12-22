import { useState } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Send } from 'lucide-react'

export default function SendLinkPage() {
  const [linkType, setLinkType] = useState<'moveOut' | 'restoration'>('moveOut')
  const [email, setEmail] = useState('')
  const [propertyName, setPropertyName] = useState('')
  const [unitNumber, setUnitNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to send the link
    // For now, we'll just simulate the process
    console.log('Sending link:', { linkType, email, propertyName, unitNumber })
    
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show a success message
    toast({
      title: "リンクを送信しました",
      description: `${email}宛にリンクを送信しました。`,
    })

    // Reset form
    setEmail('')
    setPropertyName('')
    setUnitNumber('')
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>リンク送信</CardTitle>
            <CardDescription>
              退去立会または現状回復のためのリンクを送信します。
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>リンクタイプ</Label>
                <RadioGroup 
                  defaultValue="moveOut" 
                  onValueChange={(value) => setLinkType(value as 'moveOut' | 'restoration')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moveOut" id="moveOut" />
                    <Label htmlFor="moveOut">退去立会</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="restoration" id="restoration" />
                    <Label htmlFor="restoration">現状回復</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyName">物件名</Label>
                <Input 
                  id="propertyName" 
                  placeholder="サンシャインマンション" 
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitNumber">部屋番号</Label>
                <Input 
                  id="unitNumber" 
                  placeholder="101" 
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <Send className="mr-2 h-4 w-4" /> リンクを送信
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

