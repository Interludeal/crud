'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

interface Topic {
  _id: string
  title: string
  description: string
  createAt: string
  updatedAt: string
}

export default function TopicList() {
  const [topics, setTopics] = useState<Topic[]>([])
  // useState: React의 기본 기능
  const [loading, setLoading] = useState(true)
  // 로딩시 데이터가 없기 때문에 잠깐 로딩 동안 보여주는 기능
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch('api/topics')
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
        const data = await res.json()
        setTopics(data.topics)
      } catch (error) {
        console.error('Error on loading topics: ', error)
        setError('failed to load topics')
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [])

  if (loading) return <p>Loading topics...</p>
  if (error) return <p>Error: {error}</p>

  if (topics.length === 0) return <p>No topic Title</p>

  return (
    <div>
      {topics.map((topic: Topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="text-2xl font-bold">Topic Title</h2>
            <div>{topic.description}</div>
            <div className="flex gap-4">
              <p>Created: {topic.createAt}</p>
              <p>Updated: {topic.updatedAt}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
