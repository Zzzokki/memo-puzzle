"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch("https://dev.to/api/articles?per_page=12");
      const data = await res.json();
      setPosts(data);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <Stack>
      <Container>
        <Stack gap={4} py={4}>
          <Typography variant="h4">Blogs</Typography>
        </Stack>

        {isLoading && (
          <Grid container spacing={2}>
            {new Array(12).fill(0).map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {!isLoading && (
          <Grid container spacing={2}>
            {posts.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <Link href={`/blogs/${item.id}`}>
                  <MyCard {...item} />
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Stack>
  );
}

const MyCard = ({ description, title, cover_image, social_image }) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={cover_image ?? social_image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const SkeletonCard = () => {
  return (
    <Card variant="outlined">
      <Skeleton variant="rectangular" height={140} />
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
};
