import React, { useEffect, useState } from "react";
import { makeGetRequest } from "../../utils/apis/makeGetRequest";
import { backend_url } from "../../utils/constant";
import Search from "./components/Search";
import { useDebounce } from "../../utils/hooks/useDebounce";
import Blogs from "./components/Blogs";

const index = () => {
  const [blogs, setBlogs] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  async function getAllBlogs(search) {
    const res = await makeGetRequest(`${backend_url}/post?search=${search}`);
    if (res.success === true) {
      setBlogs(res.data);
    }
  }

  useEffect(() => {
    setBlogs(null);
    getAllBlogs(debouncedSearch);
  }, [debouncedSearch]);

  console.log(search);

  return (
    <div className="p-[5%] space-y-4">
      <h1 className="text-3xl">Blogs </h1>
      <div className="flex flex-col gap-3">
        <Search search={search} setSearch={setSearch} />
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
};

export default index;
