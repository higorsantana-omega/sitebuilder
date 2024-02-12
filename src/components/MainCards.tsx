import { api } from "~/utils/api"
import { MainCard } from "./MainCard"

export function MainCards () {
  const { data: cards } = api.site.getAll.useQuery()

  return (
    <>
      {(cards ?? []).map(card => (
        <MainCard key={card.id} site={card}/>
      ))}
    </>
  )
}