import * as React from "react";
import PropTypes from "prop-types";
import {url} from '../config'
import { useCallback } from "react";
import { alpha, styled } from "@mui/material/styles";
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

// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import DeleteIcon from "@mui/icons-material/Delete";

// import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
// import { Search } from "@mui/icons-material";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

const data = [
  {
    id: 2,
    firstname: "Racha",
    lastname: "Ravi",
    username: "jb",
    email: "test@test.com",
    action: false,
    role: "user",
  },
  {
    id: 3,
    firstname: "naidu",
    lastname: "kotha",
    username: "naiduKotha",
    email: "naidukutil@gmail.com",
    action: false,
    role: "user",
  },
  {
    id: 10,
    firstname: "Ravi",
    lastname: "Sabbi",
    username: "mani1234",
    email: "mani@gmail.com",
    action: false,
    role: "user",
  },
  {
    id: 11,
    firstname: "Ravi",
    lastname: "Sabbi",
    username: "ravisabbiy",
    email: "ravisabbi7036y@gmail.com",
    action: false,
    role: "user",
  },
];

function createData(id, firstname, lastname, username, email, action) {
  return {
    id,
    firstname,
    lastname,
    username,
    email,
    action,
  };
}

const rows = [
  createData(
    2,
    "ravi",
    "lastname",
    "ravisabbi",
    "ravisabbi7036@gmail.com",
    "true"
  ),
];
data.map((e) =>
  rows.push(
    createData(e.id, e.firstname, e.lastname, e.username, e.email, e.action)
  )
);
console.log(rows);
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
//search
// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    >
    
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  //states are here
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [searchValue, setsearchValue] = useState("");
  // storing searched values in it

  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
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
      const newSelected = rows.map((n) => n.name);
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

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      
    }
   
  );
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "100px",
        }}
      >
        {/* //add search nbar here */}
        <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <button onClick={console.log("search")}>search</button>
          </Search>
        </Box>
        <Link to="/email">
          <button className="buttonAddUser"> AddUser</button>
        </Link>
      </Box>
      <>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />

            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
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
                            {/* <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell> */}
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
                            <TableCell
                              align="normal"
                              onClick={() => console.log(row.id, "done")}
                            >
                              {/**  {row.action ? "Enable" : "Disable"} */}

                              <Switch
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
    </div>
  );
}
