import TopicList from '@/components/TopicList'
import React from 'react'

export default function Homepage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">WebDev Topics</h1>
      <p className="mb-4">MongoDB CURD Example</p>
      <TopicList />
      <TopicList />
      <TopicList />
      <TopicList />
      <TopicList />
      <TopicList />
      <TopicList />
    </div>
  )
}
