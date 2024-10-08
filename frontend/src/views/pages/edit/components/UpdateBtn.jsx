import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makePutRequest } from "../../../utils/apis/makePutRequest";
import { backend_url } from "../../../utils/constant";
import { Button } from "@/components/ui/button";
import { CirCleLoader } from "../../../components/Loaders";
import Success from "../../../layout/toast/Success";
import { toast } from "sonner";

const UpdateBtn = ({ blog }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  async function updatePost(id, body) {
    const res = await makePutRequest(`${backend_url}/post/${id}`, body);
    setLoading(false);
    if (res.success) {
      toast(<Success message={"Blog Updated succesfully"} />);
    } else {
      toast(<Error />);
    }
  }

  if (loading) {
    return (
      <Button className="px-7">
        <CirCleLoader size="20" stroke="3" color="white" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        setLoading(true);
        updatePost(id, {
          title: blog.title,
          content: JSON.stringify(blog.content),
        });
      }}
    >
      Update
    </Button>
  );
};

export default UpdateBtn;
