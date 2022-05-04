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
  const dimension = {
    width: props.imageSize || imageSize,
    height: props.imageSize || imageSize,
  };

  const getImage = () => (
    <>
      {props.image ? (
        <Avatar
          sx={{
            ...dimension,
          }}
          src={props.image}
          variant="rounded"
        />
      ) : (
        <img
          src={process.env.PUBLIC_URL + "image-holder.png"}
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
