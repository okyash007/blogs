"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { makePostRequest } from "../pages/apis/makePostRequest";

const formSchema = z.object({
  name: z.string({
    message: "Name Required",
  }),
  email: z
    .string({
      message: "Email is required",
    })
    .email({
      message: "Email format is not correct",
    }),
  password: z
    .string({
      message: "Password is required",
    })
    .min(2, {
      message: "Password must be at least 2 characters.",
    }),
});

export function Signup() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: null,
      email: null,
      password: null,
    },
  });

  async function signupUser(body) {
    const res = await makePostRequest(
      "http://localhost:4000/user/signup",
      body
    );
    setLoading(false);
    if (res.success == true) {
      const { name, email } = res.data.user;
      dispatch(setUser({ name, email }));
      localStorage.setItem("acess_token", res.data.token);
    }
  }

  function onSubmit(values) {
    setLoading(true);
    signupUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-2 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button className={"mt-4"}>loaing</Button>
        ) : (
          <Button type="submit" className={"mt-4"}>
            Sign Up
          </Button>
        )}
      </form>
    </Form>
  );
}
