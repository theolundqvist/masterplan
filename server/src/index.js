const express = require("express");
const fetch = require("cross-fetch");
const HTMLParser = require("node-html-parser");

const app = express();

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

  if (query.length != 1) throw new Error("query failed");
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
        desc: split[2].split(":")[1].trim(),
      };
    });
    return response;
  } catch (e) {
    throw new Error("Kursplan could not be parsed: " + e.message);
  }
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

  getPlan(course, year).then((a) => {
    const root = HTMLParser.parse(a);
    res.setHeader("Content-Type", "text/plain");
    try {
      const hp = getHP(root);
      const grading = getGrading(root);
      res.send({ grading, parts: hp });
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
