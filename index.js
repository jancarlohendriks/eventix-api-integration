const axios = require("axios");
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const { PORT, AUTH_URL, ACCESS_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const REDIRECT_URI = encodeURIComponent(`http://localhost:${PORT}`);

const app = express();
app.use(cors({ credentials: true, origin: true, allowedHeaders: true }));
// app.use(express.json());

app.get("/", async (req, res) => {
  const code = req.query.code;
  axios({
    method: "POST",
    url: `${ACCESS_URL}?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
    // url: ACCESS_URL,
    headers: {
      Accept: "application/json",
    },
    // data: {
    //   client_id: CLIENT_ID,
    //   client_secret: CLIENT_SECRET,
    //   code: code,
    // },
  })
    .then((response) => {
      console.log(response);
      // res.json(response);
      // res.redirect(
      //   `http://localhost:${PORT}?access_token=${response.data.access_token}`
      // );
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });

  // console.log(code);
});

// app.get("/", async (req, res) => {
//   const code = req.query.code;

//   var config = {
//     method: "get",
//     url: ACCESS_URL,
//     headers: {
//       Authorization: `Bearer ${code}`,
//     },
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(response.data);
//       res.send("hello");
//     })
//     .catch(function (error) {
//       res.send("error");
//     });

//   // res.json(code);
//   // res.sendFile(path.join(__dirname, "views/index.html"));
// });

app.get("/auth", async (req, res) => {
  res.redirect(
    `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
});

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});

// import axios from "axios";

// var config = {
//   method: "get",
//   url: "https://api.eventix.io/3.0.0/scanner",
//   headers: {
//     Authorization:
//       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJTVFljVnJ1Tm5UOFFyZm02dW12VVVSVFhFSkFjT3VBSE50aGQ0WnRjIiwianRpIjoiNzY0NmJjMjU5YWQ1NzRiODZiNjg2NmQxNDI0M2EwNzk3YjI3NzkxOTQzNjc4MmE1NTZhZjVmMTFmYTE2NTkyMjA1ZDAwZTExOGNhZjI1NDUiLCJpYXQiOjE2NjQ5ODMxMDksIm5iZiI6MTY2NDk4MzEwOSwiZXhwIjoxNjY1MjQyMzA5LCJzdWIiOiI5YTU0N2IzMC0zNGUxLTExZWQtYTllZS0wM2E5OTAyODg5MjMiLCJzY29wZXMiOltdLCJhZG1pbiI6ZmFsc2UsImNvbXBhbnkiOiI5YTQyNTI3MC0zNGUxLTExZWQtODI5ZS0yMWI1ZTcxNTZhOWYiLCJ2ZXIiOjIsIndsIjoiMmU2ZDExZjAtMzY2OC0xMWU2LThhMGItOTEwN2I4ZGRiYzU1In0.HjDwvsVJdN8m7Yb0z_yNjvlNuffY7QyU6Q5lsWVKWtOD6sbIidWaEUkvWs-oXNHHFo2QTQsGypEzNj4xl0X_-PVh-k2bHjJOH6zdL-MPVR0zx10G1fcH88vTy_Ke_ALwYb9NrxhSjPcZUr-7fojaJ_SwpZrlGZ_ueaH6zFR2MAZB-TOEclUgrPVpg743R7bapPNZevsuPd_ogMx1ifXUaO8LaOPcwk3rNSTQOAgOkKzTy3Gc1XSwARiqhcn_-l7DL2Ec2aVtCg9cAjaJP_UhBp2jjeZRzndaEJ755v2ch_DpWNx3dqsBe8TkuAFuLd9Di_bNo7K6ikuBwbEoEgvUJUqpmW8gDBoQLlzS9Jrr9m6z8Me9-NB1YhUMPTvSsc0yk9MV_xYT-AUI2y5U_UT8w9nMRFNDwd8_kV3RzJVuiyoWG-f9fsnEvAZn-E3yPj3fSOUGDm-NCXX_z4q-WISmJdm83h58_WogQgMoBhbf_IthLQd20zNoFSf9XN-BMdFB-DFz6QNwQr5mnKTrROatSNa6rV_GlLT44i36T4jrBzYQFWaja3fOCNaAfdju5kfLanR8LF7JF1hpwVVzTGrZ-qv4VyTrRaMHgdCBwgblvYlaZ3ViXlN8EazWqX1QldqqqL9hzw2zp5LoJPqn19jEHF78mRac9duAuhLysElfl2o",
//   },
// };

// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
