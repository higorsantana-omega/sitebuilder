import { useRouter } from "next/router"
import { Builder } from "~/components/builder"
import { api } from "~/utils/api"

export default function BuilderPage () {
  const router = useRouter()
  const { data: site } = api.site.getById.useQuery({ id: router.query.id as string })

  return (
    <main className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Builder />
    </main>
  )
}