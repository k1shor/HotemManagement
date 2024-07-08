import { useParams } from "next/navigation";
import React from "react";

const profiles = () => {
  const id = useParams()?.id;
  return <div>{id}</div>;
};

export default profiles;
