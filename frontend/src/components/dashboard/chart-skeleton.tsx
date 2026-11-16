import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Same dimensions as the chart cards' own loading state, so the lazy chart chunk
// swapping in causes no layout shift.
export function ChartSkeleton() {
  return (
    <Card className="border-border/60" aria-hidden="true">
      <CardHeader className="pb-4">
        <Skeleton className="h-5 w-52" />
        <Skeleton className="h-3 w-64 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[280px] w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}
