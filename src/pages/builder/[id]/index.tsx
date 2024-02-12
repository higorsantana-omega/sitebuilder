import { useRouter } from "next/router"
import { Designer } from "~/components/designer"
import { api } from "~/utils/api"

export default function BuilderPage () {
  const router = useRouter()
  const { data: site } = api.site.getById.useQuery({ id: router.query.id as string })

  return (
    <main className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent">
        <Designer />
      </div>
    </main>
  )
}