import PropTypes from "prop-types";
// material-ui
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Snackbar,
  Alert,
  Grid,
  Input,
  InputLabel,
  Modal,
  Stack,
  Typography,
  TextField,
  TableCell,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import MainCard from "ui-component/cards/MainCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// project imports
import { gridSpacing } from "store/constant";
import React, { useEffect, useState } from "react";
import createUser from "api/createUser";
import getUsers from "api/getUsers";
import getRole from "api/getRole";
import deleteUser from "api/deleteUser";
import moment from "moment";
import getAnalysis from "api/getAnalysis";
import { WhatshotSharp } from "@mui/icons-material";

const ShadowBox = ({ shadow }) => (
  <Card sx={{ mb: 3, boxShadow: shadow }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4.5,
        bgcolor: "primary.light",
        color: "grey.800",
      }}
    >
      <Box sx={{ color: "inherit" }}>boxShadow: {shadow}</Box>
    </Box>
  </Card>
);

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired,
};

const Prediction = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "months").toDate()
  );
  const [toDate, setToDate] = useState(moment().toDate());
  const [analytics, setAnalytics] = useState([]);
  useEffect(() => {
    getAnalysis(
      moment(fromDate).format("YYYY-MM-DD"),
      moment(toDate).format("YYYY-MM-DD")
    ).then((res) => {
      setAnalytics(res.data);
      console.log(res.data);
      setIsLoading(false);
    });
  }, []);

  const handleFromChange = (event) => {
    setIsLoading(true);
    setFromDate(event);
    getAnalysis(
      moment(event).format("YYYY-MM-DD"),
      moment(toDate).format("YYYY-MM-DD")
    ).then((res) => {
      setAnalytics(res.data);
      setIsLoading(false);
    });
  };
  const handleToChange = (event) => {
    setIsLoading(true);
    setToDate(event);
    getAnalysis(
        moment(fromDate).format("YYYY-MM-DD"),
        moment(event).format("YYYY-MM-DD")
      ).then((res) => {
        setAnalytics(res.data);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <MainCard
          title="Sales Analysis"
          secondary={
            <>
              <DesktopDatePicker
                label="From Date"
                inputFormat="DD-MM-yyyy"
                variant="filled"
                value={fromDate}
                onChange={handleFromChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="To Date"
                inputFormat="DD-MM-yyyy"
                value={toDate}
                onChange={handleToChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </>
          }
        >
          <Grid container spacing={gridSpacing}>
            <TableContainer
              component={Paper}
              sx={{ padding: 2, marginLeft: 2, marginTop: 2 }}
              elevation={8}
            >
              <Table aria-label="simple table">
                <TableHead sx={{ borderRadius: "5px", border: 0 }}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4">Product Name </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Price</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h4">Sold Quantity </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.map((row) => (
                    <TableRow key={row.name} sx={{ "td, th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>
                        {row.sold_quantity > 100 ? (
                          <>
                            {row.sold_quantity}{" "}
                            <WhatshotSharp sx={{ color: "#D7504D" }} />{" "}
                          </>
                        ) : (
                          <>{row.sold_quantity}</>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default Prediction;
