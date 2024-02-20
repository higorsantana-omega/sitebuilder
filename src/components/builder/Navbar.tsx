import { PublishButton } from "./PublishButton"
import { SaveButton } from "./SaveButton"

export interface NavBarProps {
  siteName: string
  published: boolean
}

export function NavBar ({ siteName, published = false }: NavBarProps) {
  return (
    <nav
      className="flex justify-between border-b-2 p-4 gap-3 items-center"
    >
      <h2 className="truncate font-medium">
        <span className="text-muted-foreground mr-2">Site:</span>
        {siteName}
      </h2>

      <div className="flex items-center gap-2">
        {!published && (
          <>
            <SaveButton />
            <PublishButton />
          </>
        )}
      </div>
    </nav>
  )
}