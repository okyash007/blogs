import React, { useState } from "react";
import { makePostRequest } from "../../../utils/apis/makePostRequest";
import { backend_url } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CirCleLoader } from "../../../components/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../store/userSlice";

const PublishBtn = ({ blog }) => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const postSchema = z.object({
    title: z
      .string({
        message: "title is required",
      })
      .min(1, { message: "title must be something" }),
    content: z
      .string({
        message: "content is required",
      })
      .min(1, { message: "content must be something" }),
  });

  async function createPost(body) {
    const res = await makePostRequest(`${backend_url}/post`, body);
    console.log(res);
    setLoading(false);
    if (res.success) {
      localStorage.removeItem("blog");
      dispatch(setUser({ ...user, posts: [...user.posts, res.data._id] }));
      navigate(`/blogs/${res.data._id}`);
    }
  }

  if (loading) {
    return (
      <Button className="px-8">
        <CirCleLoader color="black" size="20" stroke="3" />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          const isValid = postSchema.safeParse({
            title: blog.title,
            content: JSON.stringify(blog.content),
          });
          if (isValid.success === true) {
            setLoading(true);
            createPost(isValid.data);
          }
        }}
      >
        Publish
      </Button>
    );
  }
};

export default PublishBtn;
