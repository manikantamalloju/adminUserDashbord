import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const da = [
  {
    status_count: {
      active_users: 2,
      inactive_users: 1,
    },
    user_data: [
      {
        username: "ravisabbi",
        no_surveys: 3,
      },
      {
        username: "jb",
        no_surveys: 2,
      },
      {
        username: "naiduKotha",
        no_surveys: 3,
      },
    ],
  },
];
console.log(da[0].user_data);
const data = da[0].user_data;

// const getPath = (x, y, width, height) => {
//   return `M${x},${y + height}C${x + width / 3},${y + height} ${x +
//     width / 2},${y + height / 3}
//   ${x + width / 2}, ${y}
//   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x +
//     width}, ${y + height}
//   Z`;
// };

// const TriangleBar = (props) => {
//   const { fill, x, y, width, height } = props;

//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };

const BarCharts = () => {
  return (
    <Box
      width={500}
      height={300}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 200,
            height: 90,
            marginBottom: "60px",
          },
        }}
      >
        <Box>
          <h1>Activeusers</h1>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
              
              backgroundColor: "green",
              color: "white",
            }}
          >
            {da[0].status_count.active_users}
          </Paper>
        </Box>
        <Box>
          <h1>Inactiveusers</h1>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "40px",
              color: "white",
              backgroundColor: "green",
            }}
          >
            {da[0].status_count.inactive_users}
          </Paper>
        </Box>
      </Box>

      {/* //bar char  */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="username" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}

          <Bar dataKey="no_surveys" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarCharts;
