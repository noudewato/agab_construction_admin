import React from "react";
import { useAllUsersQuery } from "../store/slices/usersApiSlice";

const TestPage = () => {
  const { data } = useAllUsersQuery();

  console.log(data);
  return (
    <div>
      Hello this all our users <br />
    </div>
  );
};

export default TestPage;
