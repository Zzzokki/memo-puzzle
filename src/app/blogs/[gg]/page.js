"use client";

import { Container, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { gg } = useParams();

  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gg) return;

    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(`https://dev.to/api/articles/${gg}`);
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };

    getData();
  }, [gg]);

  return (
    <Stack>
      <Container>
        {isLoading && <div>Loading...</div>}

        {!isLoading && (
          <>
            <Stack gap={4} py={4}>
              <Typography textAlign="center" variant="h4">
                {post.title}
              </Typography>
            </Stack>

            <Stack
              className="markdown-body"
              gap={4}
              dangerouslySetInnerHTML={{
                __html: post.body_html,
              }}
            ></Stack>
          </>
        )}
      </Container>
    </Stack>
  );
}
