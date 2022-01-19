import React from "react";
import { useRouter } from "next/router";

export default function AddMovie() {
  const router = useRouter();
  const { mid } = router.query;

  return <span>ID: {mid}</span>;
}
