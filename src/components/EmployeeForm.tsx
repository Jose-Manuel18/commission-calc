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

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
interface EmployeeFormProps {
  closePopover: () => void
}
export function EmployeeForm({ closePopover }: EmployeeFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const response = await fetch("api/employee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.nombre,
      }),
    })
    if (!response.ok) {
      console.log("error")
    } else {
      closePopover()
    }
    console.log(response)

    // const payment: Payment = {
    //   id: "some_id", // You'll want to replace this with a real ID
    //   amount: 0, // You'll want to replace this with a real amount
    //   status: "pending", // Set the initial status
    //   nombre: values.nombre, // Set the nombre from the form input
    // }
    // console.log(payment)
  }
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
