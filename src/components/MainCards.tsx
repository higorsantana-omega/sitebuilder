import { MainCard } from "./MainCard"

export function MainCards () {
  const cards: { id: string }[] = []

  return (
    <>
      {cards.map(card => (
        <MainCard key={card.id}/>
      ))}
    </>
  )
}