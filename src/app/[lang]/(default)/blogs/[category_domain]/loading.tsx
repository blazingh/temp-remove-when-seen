import SkeletonBlogCard from "@/components/cards/blog/skeletonBlogCard";

export default function Loading() {
  return (
    <div className="flex flex-col w-full gap-4">
      {Array.from({ length: 10 }, (_, index) => index).map((item) => (
        <SkeletonBlogCard key={item} />
      ))}
    </div>
  );
}
