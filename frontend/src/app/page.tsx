import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">議事録アプリへようこそ</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>音声ファイルのアップロード</CardTitle>
              <CardDescription>会議の音声ファイルをアップロードして、自動で議事録を作成します。</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/upload">アップロードする</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>議事録一覧</CardTitle>
              <CardDescription>作成された議事録の一覧を確認し、詳細を閲覧できます。</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/minutes">議事録を見る</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}