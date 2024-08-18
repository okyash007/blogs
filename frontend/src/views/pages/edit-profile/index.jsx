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
import { useDispatch, useSelector } from "react-redux";
import { makePostRequest } from "../../utils/apis/makePostRequest";
import { setUser } from "../../../store/userSlice";
import { CirCleLoader } from "../../components/Loaders";
import { backend_url } from "../../utils/constant";

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

function index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.data);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: null,
    },
  });

  async function signupUser(body) {
    const res = await makePostRequest(`${backend_url}/user/update`, body);
    setLoading(false);
    if (res.success == true) {
      dispatch(setUser({ ...user, name: body.name, email: body.email }));
    }
  }

  function onSubmit(values) {
    setLoading(true);
    signupUser(values);
  }

  return (
    <div className="p-[5%] flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-2 flex flex-col w-[340px]"
        >
          <h1 className="text-3xl font-extrabold tracking-wide">
            Edit Profile
          </h1>
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
              Update
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default index;
