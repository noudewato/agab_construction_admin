import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { FaEye } from "react-icons/fa";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React from "react";
import BarChart from "../components/home/charts/BarChart";
import Stats from "../components/home/stats/Stats";
import TopCountries from "../components/home/TopCountries";
import Layout from "./Layout";
import { useGetProductsQuery } from "../store/slices/productsSlice";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Dashboard = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo?.jwt_auth) {
      navigate("/login");
    }
  }, [navigate, userInfo?.jwt_auth]);

  const ComponentWrapper = styled(Box)({
    marginTop: "10px",
    paddingBottom: "10px",
  });

  return (
    <Layout>
      <Box sx={{ pt: "80px", pb: "20px" }}>
        <Typography variant="h6" sx={{ marginBottom: "14px" }}>
          Dashboard
        </Typography>
        <ComponentWrapper>
          <Stats />
        </ComponentWrapper>

        <ComponentWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <BarChart />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",
                  height:"100%"
                }}
              >
                <TopCountries />
              </Paper>
            </Grid>
          </Grid>
        </ComponentWrapper>

        <ComponentWrapper>
          <Typography variant="h5" sx={{ my: 3 }}>
            Items
          </Typography>
          {isLoading ? (
            <>...Loading</>
          ) : error ? (
            <Box>{error?.data?.message || error?.error}</Box>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Item</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Created At</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.slice(0, 5).map((product) => (
                    <StyledTableRow key={product._id}>
                      <StyledTableCell>
                        <img
                          className="w-[200px] h-[100px] object-cover rounded-lg"
                          src={product.images[0]}
                          alt={product.propertyName}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{product.productName}</StyledTableCell>
                      <StyledTableCell>{product.productPrice}</StyledTableCell>
                      <StyledTableCell>
                        {moment(product.createdAt).format("DD/MM/YYYY")} <br />
                        {moment(product.createdAt).format("hh:mm:ss")}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link
                          to={`detail-parcelle/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Box sx={{ color: "blue", fontSize: "1.5rem" }}>
                            <FaEye />
                          </Box>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </ComponentWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          <Button variant="outlined">
            <Link to="/agab-boutique">Voir plus</Link>
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
