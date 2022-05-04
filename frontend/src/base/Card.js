import { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Skeleton,
  CardActionArea,
} from "@mui/material";
import "./Card.css";

const imageSize = 100;

const MyCard = (props) => {
  const [imageExists, setImageExists] = useState(Boolean(props.image));

  const dimension = {
    width: props.imageSize || imageSize,
    height: props.imageSize || imageSize,
  };

  const getImage = () => (
    <>
      {props.image && imageExists ? (
        <Avatar
          sx={{
            ...dimension,
          }}
          variant="rounded"
        >
          <img
            src={props.image}
            alt={props.title}
            onError={(e) => {
              setImageExists(false);
            }}
          />
        </Avatar>
      ) : (
        <img
          src={process.env.PUBLIC_URL + "/image-holder.png"}
          alt={props.title}
          {...dimension}
        />
      )}
    </>
  );

  const displayCardContent = () => (
    <CardContent>
      <Box display="flex">
        <Box minWidth={props.imageSize || imageSize}>
          {props.loading ? (
            <Skeleton variant="rectangular" {...dimension} />
          ) : (
            <>{getImage()}</>
          )}
        </Box>
        <Box display="flex" flexDirection="column" ml={1} width="100%">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.loading ? <Skeleton /> : props.heading}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.loading ? <Skeleton /> : props.title}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            className="card-description"
          >
            {props.loading ? (
              <>
                <Skeleton width="100%" />
                <Skeleton width="80%" />
                <Skeleton width="50%" />
              </>
            ) : (
              props.description
            )}
          </Typography>
        </Box>
        {props.quantity !== undefined ? (
          <Box my="auto" mr={2}>
            <Typography
              component="span"
              variant="h6"
            >
              {props.loading ? <Skeleton /> : props.quantity}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </CardContent>
  );

  return (
    <Card>
      {!props.loading && props.onClick ? (
        <CardActionArea onClick={props.onClick}>
          {displayCardContent()}
        </CardActionArea>
      ) : (
        <>{displayCardContent()}</>
      )}
    </Card>
  );
};

export default MyCard;
