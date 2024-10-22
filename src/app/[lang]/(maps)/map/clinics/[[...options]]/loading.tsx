import ClinicCardSkeleton from "@/components/cards/clinic/skeletonClinicCard";

export default function Loading() {
  return (
    <div className="flex flex-col w-full gap-4">
      {Array.from({ length: 10 }, (_, index) => index).map((item) => (
        <ClinicCardSkeleton key={item} />
      ))}
    </div>
  );
}
