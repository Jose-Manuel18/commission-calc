"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useMutation } from "@tanstack/react-query"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
interface EmployeeFormProps {
  closePopover: () => void
  refetch: () => void
}
export function EmployeeForm({ closePopover, refetch }: EmployeeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
    },
  })

  const mutation = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return fetch("api/employee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.nombre,
        }),
      })
    },
    onSuccess: () => {
      refetch()
      closePopover()
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values)
  }
  console.log(mutation.isSuccess)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Juanita" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
