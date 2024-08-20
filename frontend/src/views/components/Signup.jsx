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
import { makePostRequest } from "../utils/apis/makePostRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { CirCleLoader } from "./Loaders";
import { backend_url } from "../utils/constant";
import { toast } from "sonner";
import Error from "../layout/toast/Error";
import Success from "../layout/toast/Success";

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
    .string({ message: "password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      { message: "password is not in correct format" }
    ),
});

export function Signup() {
  const dispatch = useDispatch();
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
    const res = await makePostRequest(`${backend_url}/user/signup`, body);
    setLoading(false);
    if (res.success == true) {
      const { name, email, _id, posts, bookmarks, profile_image } =
        res.data.user;
      dispatch(setUser({ name, email, _id, posts, bookmarks, profile_image }));
      localStorage.setItem("acess_token", res.data.token);
      toast(<Success message={"Signup succesful"}/>)
    } else {
      toast(<Error />);
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
          <Button className={"mt-4"}>
            <CirCleLoader size={"20"} stroke={"3"} color={"black"} />
          </Button>
        ) : (
          <Button type="submit" className={"mt-4"}>
            Sign Up
          </Button>
        )}
      </form>
    </Form>
  );
}
