import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarginsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <Tabs defaultValue="configurations" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="configurations" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-md shadow">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-10 w-48" />
                  <Skeleton className="h-10 w-40" />
                </div>
              </div>

              <div className="bg-white rounded-md shadow">
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-4 mb-4">
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                    <Skeleton className="h-6 col-span-1" />
                  </div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="grid grid-cols-7 gap-4 mb-4">
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                      <Skeleton className="h-6 col-span-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-4 rounded-md shadow">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-md shadow">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <div className="bg-white rounded-md shadow">
            <div className="p-4">
              <div className="grid grid-cols-5 gap-4 mb-4">
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
              </div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 mb-4">
                  <Skeleton className="h-6 col-span-1" />
                  <Skeleton className="h-6 col-span-1" />
                  <Skeleton className="h-6 col-span-1" />
                  <Skeleton className="h-6 col-span-1" />
                  <Skeleton className="h-6 col-span-1" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
