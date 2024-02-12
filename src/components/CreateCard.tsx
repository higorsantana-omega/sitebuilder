/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use-client'
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FilePlus, Loader } from 'react-feather'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { siteSchema, type siteSchemaType } from "~/schemas/site";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { toast } from "./ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateCard () {
  const router = useRouter()
  const form = useForm<siteSchemaType>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: '',
      path: ''
    }
  })
  const { mutateAsync } = api.site.create.useMutation()

  async function onSubmit (values: siteSchemaType) {
    try {
      const siteId = await mutateAsync(values)
      toast({
        title: "Success",
        description: "Site created successfully",
      });
      router.push(`/builder/${siteId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group h-[190px] items-center justify-center flex flex-col hover:cursor-pointer border-dashed gap-4"
        >
          <FilePlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl">Create new site</p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create site</DialogTitle>
          <DialogDescription>Create a new site</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && <Loader className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}