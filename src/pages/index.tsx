import Head from "next/head";
import Link from "next/link";
import { Suspense } from "react";
import { CreateCard } from "~/components/CreateCard";
import { MainCard } from "~/components/MainCard";
import { MainCardSkeleton } from "~/components/MainCardSkeleton";
import { MainCards } from "~/components/MainCards";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sitebuilder</title>
        <meta name="description" content="site builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
          <div className="flex gap-4 items-center">
            Sitebuilder
          </div>
        </nav>

        <main className="flex w-full flex-grow">
          <div className="container pt-4">
            <h2 className="text-4xl font-bold col-span-2">Sites</h2>
            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CreateCard />
              <Suspense
                fallback={[1, 2, 3].map(el => (
                  <MainCardSkeleton key={el} />
                ))}
              >
                <MainCards />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
