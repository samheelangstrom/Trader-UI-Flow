import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="h-[60px] bg-white border-b border-[#dcdddf]">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="container mx-auto py-6">
        <Skeleton className="h-8 w-64 mb-6" />

        <Skeleton className="h-10 w-full mb-4" />

        <div className="bg-white rounded-md shadow p-4">
          <Skeleton className="h-6 w-3/4 mb-4" />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-40 w-full rounded-md" />
            </div>

            <Skeleton className="h-60 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
