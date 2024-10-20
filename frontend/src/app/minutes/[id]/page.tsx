"use client"

import Navbar from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

interface MinuteDetail {
  id: string
  title: string
  date: string
  content: string
}

const mockMinutes: MinuteDetail[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  title: `週次ミーティング ${i + 1}`,
  date: new Date(2023, 3, i + 1).toISOString().split('T')[0],
  content: `1. プロジェクトの進捗状況の確認\n2. 次週の目標設定\n3. チーム内の課題共有\n4. 質疑応答\n\n議事録 ${i + 1} の詳細内容`
}))

export function generateStaticParams() {
  return mockMinutes.map((minute) => ({
    id: minute.id,
  }))
}

export default function MinuteDetailPage({ params }: { params: { id: string } }) {
  const [minute, setMinute] = useState<MinuteDetail | null>(null)

  useEffect(() => {
    // Simulate fetching data
    const fetchedMinute = mockMinutes.find(m => m.id === params.id) || null
    setMinute(fetchedMinute)
  }, [params.id])

  if (!minute) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{minute.title}</CardTitle>
            <CardDescription>{minute.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{minute.content}</pre>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}