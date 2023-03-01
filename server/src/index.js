const express = require("express");
const fetch = require("cross-fetch");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const HTMLParser = require("node-html-parser");

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
const PORT = process.env.PORT || 80;

function getPlan(course, year) {
  return fetch(`https://kurser.lth.se/kursplaner/${year}/${course}.html`).then(
    (data) => {
      return data.text();
    }
  );
}

function split(array, predicate) {
  const splits = [];
  let temp = [];

  array.forEach((elem) => {
    if (predicate(elem)) {
      if (temp.length > 0) splits.push(temp);
      temp = [elem];
    } else temp.push(elem);
  });
  if (temp.length > 0) splits.push(temp);
  return splits;
}

function getGrading(data) {
  try {
    const query = data
      .querySelectorAll("p")
      .filter(
        (x) =>
          x.toString().includes("Betygsskala") &&
          !x.toString().includes("Delmoment")
      )[0]
      .innerText.split("Prestationsbedömning:")
      .slice(-1)[0]
      .trim();
    return query.toString();
  } catch (e) {
    throw new Error("Parsing kursplan failed: " + e.message);
  }
}

function getHP(data) {
  const query = data
    .querySelectorAll("p")
    .filter((x) => x.toString().includes("Delmoment"));
  if (query.length == 0) return [];
  if (query.length != 1)
    throw new Error("query failed, query length:" + query.length);
  try {
    const delmoment = query[0].childNodes;

    const grouped = split(delmoment, (e) => e.innerText.includes("Kod:"))
      .slice(1)
      .map((x) => x.slice(3).map((y) => y.innerText));

    const response = grouped.map((moment) => {
      const split = moment
        .filter((elem) => elem.includes("högskolepoäng"))
        .toString()
        .split(".");
      return {
        hp: Number(split[0].split(":")[1].replace(",", ".").trim()),
        grade: split[1].split(":")[1].trim().toString(),
        desc: split[2].split(":")[1]?.trim() || "",
      };
    });
    return response;
  } catch (e) {
    throw new Error("Kursplan could not be parsed: " + e.message);
  }
}
function getExam(data) {
  // HTMLParser.parse().
  const str = data.text.toLowerCase();
  const search = (keywords) => {
    let matches = 0;
    console.log("\nsearching");
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      let word = "";
      let weight = 1;
      if (typeof keyword !== "string") {
        word = keyword[0];
        weight = keyword[1];
      } else word = keyword;
      const value = (str.split(word).length - 1) * weight;
      matches += value;
      console.log(word, value);
    }
    console.log("total:", matches);
    return matches;
  };
  const probability = (desired, points) => {
    const percentage = points / desired;
    return percentage;
  };
  const matrix = {
    written: probability(
      5,
      search([
        ["skriftlig", 1],
        ["skriftlig tentamen", 3],
        ["skriftliga tentamen", 3],
      ])
    ),
    oral: probability(
      5,
      search([
        "munta",
        "muntlig",
        ["muntlig presentation", -1],
        ["muntligt föredrag", -1],
      ])
    ),
    presentation: probability(
      5,
      search([
        "presentation",
        ["muntlig presentation", 3],
        ["muntligt föredrag", 3],
      ])
    ),
    labs: probability(5, search(["laborationer", "datorlaborationer"])),
    project: probability(5, search(["projekt", "grupparbete"])),
    assigments: probability(
      5,
      search([["inlämningsuppgifter", 3], "inlämningsuppift"])
    ),
    report: probability(5, search(["rapport", ["skriftlig rapport", 3]])),
  };

  const res = {};
  Object.entries(matrix).forEach((x) => {
    console.log(x);
    let verdict = "maybe";
    if (x[1] > 0.7) verdict = "yes";
    if (x[1] < 0.3) verdict = "no";
    res[x[0]] = { verdict, probability: x[1] };
  });
  return res;
  // const types = [];
  // if (search("skriftlig")) types.push("written");
  // if (res.includes("muntlig")) types.push("oral");
  // if (res.includes("laborationer")) types.push("labs");
  // if (res.includes("projekt")) types.push("project");
  // return types;
}

app.get("/kursplan", (req, res) => {
  const year = req.query["year"];
  const course = req.query["course"];
  if (!year || !course) {
    res.send(404);
    return;
  }
  getPlan(course, year).then((a) => {
    if (
      a.includes(`<div class="pdfbody">
<span class="italic">Kursplan för</span><br />`)
    )
      res.send(a);
    else res.send(404);
  });
});

app.get("/tenta", (req, res) => {
  const year = req.query["year"];
  const course = req.query["course"];
  if (!year || !course) {
    res.send(404);
    return;
  }
  res.header("Content-Type", "application/json");
  getPlan(course, year).then((a) => {
    const root = HTMLParser.parse(a);
    res.setHeader("Content-Type", "text/plain");
    try {
      const hp = getHP(root);
      const grading = getGrading(root);
      const exam = getExam(root);
      res.send(JSON.stringify({ grading, parts: hp, exam }, null, 2));
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
