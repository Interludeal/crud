import type { ComponentType } from 'react'
import EditTopicForm from '@/components/EditTopicForm'
const apiUrl = process.env.API_URL ?? ''

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store',
    })
    if (!res || !res.ok) {
      throw new Error('Failed to fetch topic.')
    }
    return res.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async function EditTopic({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data = await getTopicById(id)

  if (!data) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">토픽을 불러오지 못했습니다.</h2>
      </div>
    )
  }

  const topic = (data.topic ?? data) as {
    title?: string
    description?: string
  } | null

  if (!topic) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold">토픽 데이터가 없습니다.</h2>
      </div>
    )
  }

  const title = topic.title ?? ''
  const description = topic.description ?? ''

  type EditFormProps = {
    id: string
    title: string
    description: string
  }

  const EditForm = EditTopicForm as unknown as ComponentType<EditFormProps>

  return <EditForm id={id} title={title} description={description} />
}
