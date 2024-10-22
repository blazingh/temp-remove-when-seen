/* eslint-disable react/no-unescaped-entities */
"use client";


export default function AboutSheetContent({
  text,
}: {
  text: string;
}) {

  return (
    <div className=" h-[60svh] overflow-auto">{text}</div>
  );
}
