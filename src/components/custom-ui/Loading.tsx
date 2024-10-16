import { IconLoading } from '@/icons'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
          <IconLoading className="h-6 w-6 animate-spin text-gray-50" />
        </div>
      </div>
    </div>
  )
}

export default Loading
