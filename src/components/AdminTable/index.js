import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { url } from "../config";
import { useCallback } from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
// import styled from "@emotion/styled";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import InputBase from "@mui/material/InputBase";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";

import { Switch } from "@mui/material";

import axios from "axios";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
// table head values
const headCells = [
  {
    id: "id",
    numeric: true,

    label: "id",
  },
  {
    id: "firstname",
    numeric: false,

    label: "firstname",
  },
  {
    id: "lastname",
    numeric: false,

    label: "lastname",
  },
  {
    id: "username",
    numeric: false,

    label: "username",
  },
  {
    id: "email",
    numeric: false,
    label: "email",
  },
  {
    id: "action",
    numeric: false,

    label: "action",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            // {headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    ></Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AdminTable() {
  //states are here
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  // storing searched values in it
  // console.log({ data: rows });
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [enable, setEnable] = React.useState(false);

  // storing user email and validationg
  const storeEmail = (event) => {
    setEmail(event.target.value);
    const emailRegex = /\S+@\S+\.\S+/;
    if (event.target.value == "") {
      setEmailError("Enter Email");
    } else if (!emailRegex.test(event.target.value)) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
  };


  

  // sending email to adding user
  const sendMailData = () => {
   if(email==""){
    setEmailError("Enter Email")
   }
    else if (emailError=="") {
      //  logic here
      axios
        .post(url.API + "sendMail", { email })
        .then((response) => {
          setEmail("");
          toast.success(" Mail sent", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setAddUserOpen(false);
          }, 2000);
          console.log(response);
        })
        .catch((error) => {
          setEmail("");
          toast.error(" Mail  not sent", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error);
        });
      handleAddUserClose();
    }
  };
  const storingSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  console.log(searchValue);
  // geting data from url
  const getUSersData = async () => {
    axios
      .get(url.API + "getUsers?search_result=" + searchValue)
      .then((response) => {
        if (response.statusText === "OK") {
          console.log(response);
          setVisibleRows(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };
  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };
  const enableUser = async (id, action) => {
    axios
      .patch(url.API + "restrictUser", { id, action: !action })
      .then((response) => {
        if (response.statusText === "OK") {
          console.log(response, "enableaction_working");
        }
      })
      .catch((error) => {
        console.log(error, "error from enable action");
      });
    console.log(id, "its working");
    setEnable(!enable);
  };

  useEffect(() => {
    let rowsOnMount = stableSort(
      visibleRows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    getUSersData();

    //setVisibleRows(rowsOnMount);
  }, [enable, searchValue]);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        visibleRows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // pagination logic
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);

    const sortedRows = stableSort(visibleRows, getComparator(order, orderBy));
    const updatedRows = sortedRows.slice(
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );

    setVisibleRows(updatedRows);
  });

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(visibleRows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className="container">
      {/* search and email container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        {/* search  container */}
        <Box
          sx={{
            borderWidth: "2px",
            borderColor: "E0E0E0",
            borderStyle: "solid",
            borderRadius: "8px",
          }}
        >
          <div className="search-container-div">
            <SearchIcon />
            <input
              className="input-search-table"
              type="text"
              value={searchValue}
              onChange={storingSearchValue}
            />

            <button className="table-search-button">search</button>
          </div>
        </Box>

        <button className="table-search-button" onClick={handleAddUserOpen}>
          AddUser
        </button>
        {/* handleAddUserClose */}
        {/* Emailcontainer */}
        <Dialog open={addUserOpen} onClose={handleAddUserClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              please enter email address here.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e)=>storeEmail(e)}
              error={emailError}
              helperText={emailError }
            
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddUserClose}>Cancel</Button>
            <Button onClick={sendMailData}>Send</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                {/* need to change head colo */}
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={visibleRows.length}
                />
                <TableBody>
                  {visibleRows
                    ? visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.name}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="normal">{row.id}</TableCell>
                            <TableCell align="normal">
                              {row.firstname}
                            </TableCell>
                            <TableCell align="normal">{row.lastname}</TableCell>
                            <TableCell align="normal">{row.username}</TableCell>
                            <TableCell align="normal">{row.email}</TableCell>
                            <TableCell align="normal">
                              {/**  {row.action ? "Enable" : "Disable"} */}

                              <Switch
                                onClick={() => {
                                  enableUser(row.id, row.action);
                                }}
                                checked={row.action}
                                //  onChange={}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                  {paddingHeight > 0 && (
                    <TableRow
                      style={{
                        height: paddingHeight,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* paginatiom */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={visibleRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}
