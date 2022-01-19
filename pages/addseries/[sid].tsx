import React from "react";
import { useRouter } from "next/router";

export default function AddSeries() {
  const router = useRouter();
  const { sid } = router.query;

  return <span>ID: {sid}</span>;
}
