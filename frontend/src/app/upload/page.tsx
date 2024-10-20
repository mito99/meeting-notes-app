"use client"

import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Upload } from 'lucide-react'
import { useState } from 'react'

export default function UploadPage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("ファイルアップロードに失敗しました");
      }

      const result = await response.json();
      toast({
        title: "ファイルアップロードに成功しました",
        description: result.message,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "不明なエラーが発生しました";
      toast({
        title: "ファイルアップロードに失敗しました",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>音声ファイルのアップロード</CardTitle>
            <CardDescription>会議の音声ファイルをアップロードしてください。</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="flex-grow"
                />
                <Button type="submit" disabled={!file}>
                  <Upload className="mr-2 h-4 w-4" />
                  アップロード
                </Button>
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  選択されたファイル: {file.name}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
