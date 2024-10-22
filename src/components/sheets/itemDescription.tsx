"use client";

export default function ItemDescriptionSheetContent({
  description,
}: {
  description?: React.ReactNode;
}) {
  return <div className="mt-2 max-h-[80svh] overflow-auto">{description}</div>;
}
