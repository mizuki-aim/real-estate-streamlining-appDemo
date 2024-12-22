import { useState, useRef } from 'react'
import Layout from '@/components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Upload, X } from 'lucide-react'

export default function PhotoUploadPage() {
  const [photos, setPhotos] = useState<File[]>([])
  const [comment, setComment] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(prevPhotos => [...prevPhotos, ...Array.from(e.target.files as FileList)])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to upload the photos and comment
    // For now, we'll just simulate the process
    console.log('Uploading photos:', photos)
    console.log('Comment:', comment)
    
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Show a success message
    toast({
      title: "写真とコメントをアップロードしました",
      description: `${photos.length}枚の写真をアップロードしました。`,
    })

    // Reset form
    setPhotos([])
    setComment('')
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>写真アップロード</CardTitle>
            <CardDescription>
              退去立会または現状回復のための写真とコメントをアップロードします。
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo-upload">写真</Label>
                <div className="grid grid-cols-2 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded photo ${index + 1}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {photos.length < 6 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-40 w-full flex flex-col items-center justify-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-6 w-6 mb-2" />
                      写真を追加
                    </Button>
                  )}
                </div>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <p className="text-sm text-gray-500">最大6枚までアップロードできます。</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">コメント</Label>
                <Textarea 
                  id="comment" 
                  placeholder="写真に関するコメントを入力してください。" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <Upload className="mr-2 h-4 w-4" /> アップロード
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

