"use server";
import React from "react";
import Content from "./content";

export async function generateMetadata() {
  return {
    title: "The Weather App",
  }
}

export default async function Index() {
  return (
    <Content />
  )
}