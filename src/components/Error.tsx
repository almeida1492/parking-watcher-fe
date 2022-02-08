import { Button } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const Error: FC = () => {
  return (
    <div className="error" style={{ textAlign: "center" }}>
      <h1>500</h1>
      <h2>Sorry! Something went wrong.</h2>
      <p>Please, retry it later.</p>
      <Link to="/">
        <Button size="small" startIcon={<HomeIcon />}>
          Return to the homepage
        </Button>
      </Link>
    </div>
  );
};
