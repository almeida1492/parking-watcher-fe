import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography, Link as LinkMui } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const About: FC = () => {
  return (
    <div className="about">
      <Link to="/">
        <Button size="small" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Link>
      <Typography variant="h3" mb={2} fontFamily="SourceSerif4">
        About
      </Typography>
      <Typography variant="body1">
        <i>Parking Watcher</i> is an open source collaborative application that
        enables citizens to help each other not spend their precious time, burn
        gasoline, and crowd up the streets looking for an empty parking lot
        around the city. Here you can find every available parking lot other
        users reported in the last few minutes. Then you can ask your co-pilot
        to check where that is and head straight up to that point. You can see
        how long it was reported by looking at the <b>number over the marker</b>{" "}
        on the map. The app is going to be counting that time in <b>minutes</b>.
        The more recent it is, the more likely you’re going to find that
        available. Also, you can return the kindness of other users and report
        an empty parking lot whenever you’re leaving it, or even if you are
        passing by and notice it.
        <br />
        To mark a parking lot report as occupied,{" "}
        <b>you have to be in that very spot</b> so we can make sure you’re
        marking up the right report. The best way to do that is to park your car
        first and then mark it as occupied.
        <br />
        You can send me suggestions for improving this app at{" "}
        <LinkMui href="mailto:henriquealmeida1492@gmail.com?subject=ParkingWatcher">
          henriquealmeida1492@gmail.com
        </LinkMui>
        . Thanks!
      </Typography>
    </div>
  );
};
