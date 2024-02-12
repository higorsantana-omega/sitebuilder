import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Edit } from 'react-feather'
import { type Page } from "@prisma/client";

export type MainCardProps = {
  site: Page
}

export function MainCard ({ site }: MainCardProps) {
  console.log('oi')
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{site.name}</span>
        </CardTitle>

        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          Description
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        No description
      </CardContent>

      <CardFooter>
      <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
        <Link href={`/builder/${site.id}`}>
          Edit site <Edit />
        </Link>
      </Button>
      </CardFooter>
    </Card>
  )
}