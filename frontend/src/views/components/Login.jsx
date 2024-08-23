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
import { makePostRequest } from "../utils/apis/makePostRequest";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { CirCleLoader } from "./Loaders";
import { backend_url } from "../utils/constant";
import { toast } from "sonner";
import Error from "../layout/toast/Error";
import Success from "../layout/toast/Success";

const formSchema = z.object({
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

export function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: null,
      password: null,
    },
  });

  async function loginUser(body) {
    const res = await makePostRequest(`${backend_url}/user/login`, body);
    setLoading(false);
    if (res.success == true) {
      const { name, email, _id, posts, bookmarks, profile_image } =
        res.data.user;
      dispatch(setUser({ name, email, _id, posts, bookmarks, profile_image }));
      localStorage.setItem("acess_token", res.data.token);
      toast(<Success message={"Successfullt loged in"} />);
    } else {
      toast(<Error message={res.message} />);
    }
  }

  function onSubmit(values) {
    setLoading(true);
    loginUser(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
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
            <CirCleLoader size={"20"} stroke={"3"} color={"white"} />
          </Button>
        ) : (
          <Button type="submit" className={"mt-4"}>
            Login
          </Button>
        )}
      </form>
    </Form>
  );
}
