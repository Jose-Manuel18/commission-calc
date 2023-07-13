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
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  comision: z
    .string()
    .min(1, {
      message: "Commission must be at least 0.",
    })
    .max(2),
})
interface EmployeeFormProps {
  closePopover: () => void
  refetch: () => void
  userId: number
}
export function EmployeeForm({
  closePopover,
  refetch,
  userId,
}: EmployeeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      comision: "",
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return fetch("api/employee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.nombre,
          commission: values.comision,
          userId: userId,
        }),
      })
    },
    onSuccess: () => {
      refetch()
      closePopover()
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Juanita" {...field} />
                </FormControl>
                <FormDescription>Nombre del empleado.</FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="comision"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Comisión</FormLabel>
                <FormControl typeof="number">
                  <Input placeholder="15%" type="number" {...field} />
                </FormControl>
                <FormDescription>
                  Aqui va la comisión del empleado.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {isLoading ? (
          <Button type="submit" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Añadiendo
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  )
}
