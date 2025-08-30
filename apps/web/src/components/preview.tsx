import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tech-stack/ui/components/card";
import Image from "next/image";

import { CodeBlock } from "#components/code-block";
import { useEffect, useState } from "react";

export function Preview({ src, code }: { src: string; code: string }) {
  const [, setSrc] = useState(src);
  useEffect(() => {
    const url = new URL(src, window.location.origin);
    const slugsParam = url.searchParams.get("slugs");
    if (slugsParam) {
      const uniqueSlugs = [...new Set(slugsParam.split(","))];
      url.searchParams.set("slugs", uniqueSlugs.join(","));
      setSrc(url.pathname + url.search);
    }
  }, [src, setSrc]);
  return (
    <section className="@5xl/main:order-last order-first">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="relative aspect-square size-full">
            <Image
              src={src}
              alt="Preview"
              fill={true}
              draggable={false}
              unoptimized={true}
            />
          </div>
        </CardContent>
        <CardFooter>
          <CodeBlock language="markdown" code={code} />
        </CardFooter>
      </Card>
    </section>
  );
}
