import { Typography, Link} from "@mui/material";

export default function CopyRight(props) {

    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://gama.refex.group/policy">
          Sparzana Aviation Pvt Ltd
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }