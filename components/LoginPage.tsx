import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Here you would typically make an API call to authenticate
    // For now, we'll just simulate the process
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check credentials (replace with actual authentication logic)
      if (email === 'admin@example.com' && password === 'password') {
        toast({
          title: "ログイン成功",
          description: "ダッシュボードにリダイレクトします。",
        })
        router.push('/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      toast({
        title: "ログイン失敗",
        description: "メールアドレスまたはパスワードが正しくありません。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">不動産管理システム</CardTitle>
          <CardDescription className="text-center">アカウントにログイン</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

