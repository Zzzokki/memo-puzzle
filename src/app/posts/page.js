"use client";

import {
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [isOnTransition, setIsOnTransition] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "https://656e8a31cb41cca10e9d7539.mockapi.io/posts"
        );
        const data = await res.json();
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  return (
    <Stack bgcolor="#eee" minHeight="100vh">
      <Container>
        <Stack gap={4} py={4}>
          <Typography variant="h4">Posts</Typography>

          {isLoading && <Typography>Loading...</Typography>}

          {!isLoading && (
            <>
              <Box width="100%">
                <Stack
                  direction="row"
                  width="500%"
                  onTransitionStart={() => {
                    setIsOnTransition(true);
                  }}
                  onTransitionEnd={() => {
                    if (carouselIndex === 4) {
                      setCarouselIndex(1);
                      setWithTransition(false);
                    }

                    if (carouselIndex === 0) {
                      setCarouselIndex(3);
                      setWithTransition(false);
                    }

                    setIsOnTransition(false);
                  }}
                  sx={{
                    transform: `translateX(-${20 * carouselIndex}%)`,
                    transition: withTransition ? "300ms" : "none",
                  }}
                >
                  <Stack flex={1}>
                    <Stack width="100%" position="relative" pt="40%">
                      <Stack
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                      >
                        <PostCard {...posts[2]} />
                      </Stack>
                    </Stack>
                  </Stack>
                  {posts.slice(0, 3).map((post) => (
                    <Stack flex={1} key={post.id}>
                      <Stack width="100%" position="relative" pt="40%">
                        <Stack
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                        >
                          <PostCard {...post} />
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                  <Stack flex={1}>
                    <Stack width="100%" position="relative" pt="40%">
                      <Stack
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                      >
                        <PostCard {...posts[0]} />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>

              <Stack direction="row" justifyContent="flex-end">
                <Stack direction="row" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (isOnTransition) return;
                      setCarouselIndex((prev) => prev - 1);
                      setWithTransition(true);
                      setIsOnTransition(true);
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (isOnTransition) return;
                      setCarouselIndex((prev) => prev + 1);
                      setWithTransition(true);
                      setIsOnTransition(true);
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </Stack>
  );
}

const PostCard = ({ image, title, description }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <Stack height="100%">
        <Stack flex={1}>
          <CardMedia
            sx={{ height: "100%", objectFit: "cover" }}
            image={image}
            title="green iguana"
          />
        </Stack>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Stack>
    </Card>
  );
};
