"use client"

import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Minute {
  id: string
  title: string
  date: string
  status: 'processing' | 'completed'
}

const ITEMS_PER_PAGE = 10

export default function MinutesPage() {
  const [minutes, setMinutes] = useState<Minute[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // TODO: Fetch minutes from backend
    // This is a mock implementation
    const mockMinutes: Minute[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      title: `議事録 ${i + 1}`,
      date: new Date(2023, 3, i + 1).toISOString().split('T')[0],
      status: i % 3 === 0 ? 'processing' : 'completed'
    }))
    setMinutes(mockMinutes)
  }, [])

  const totalPages = Math.ceil(minutes.length / ITEMS_PER_PAGE)
  const paginatedMinutes = minutes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">議事録一覧</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>日付</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>アクション</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMinutes.map((minute) => (
              <TableRow key={minute.id}>
                <TableCell>{minute.title}</TableCell>
                <TableCell>{minute.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    minute.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {minute.status === 'completed' ? '完了' : '処理中'}
                  </span>
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/minutes/${minute.id}`}>詳細を見る</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}