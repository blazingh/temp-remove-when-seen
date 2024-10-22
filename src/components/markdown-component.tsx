import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function MarkdownHtml({
  className,
  content,
}: {
  className?: string;
  content: string;
}) {
  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      className={cn("prose max-w-full", className)}
      components={{
        a(props) {
          return (
            <Link
              {...{ ...(props as any), href: extractPath(props.href) as any }}
            />
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}

function extractPath(url?: string) {
  if (!url) return "";
  try {
    // Use the URL constructor if the URL contains a domain and protocol
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search + urlObj.hash;
  } catch (e) {
    return url;
  }
}
