const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(express.static("public"));
app.listen(port, () => {
  console.clear();
  console.log("Listening on http://localhost:" + port);
});

const ROW_LABEL = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "fly",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const TYPE_MAP = {
  "type-fx-cell type-fx-0": "no effect",
  "type-fx-cell type-fx-25": "not effective at all",
  "type-fx-cell type-fx-50": "not very effective",
  "type-fx-cell type-fx-100": "normal effectiveness",
  "type-fx-cell type-fx-200": "very effective",
  "type-fx-cell type-fx-400": "super effective",
};

const createDualTypeMap = () => {
  const dualTypeMap = {};

  ROW_LABEL.forEach((firstType) => {
    dualTypeMap[`${firstType}`] = {};
    ROW_LABEL.forEach((secondType) => {
      if (firstType !== secondType) {
        dualTypeMap[`${firstType},${secondType}`] = {};
      }
    });
  });

  return dualTypeMap;
};

app.get("/api", async (req, res, next) => {
  let url = "https://pokemondb.net/type/dual";

  try {
    await JSDOM.fromURL(url).then((dom) => {
      const document = dom.window.document;
      const typeRows = document.getElementsByTagName("TR");
      const trimmedRows = [...typeRows].filter((row, index) => index % 19);
      const dualTypeMap = createDualTypeMap();

      [...trimmedRows].forEach((row, rowIndex) => {
        const firstTypeIndex = Math.floor(rowIndex / 18);
        const secondTypeIndex = rowIndex % 18;
        const firstType = ROW_LABEL[firstTypeIndex];
        const secondType = firstTypeIndex === secondTypeIndex ? "" : `,${ROW_LABEL[secondTypeIndex]}`;

        const data = row.getElementsByTagName("TD");

        [...data]
          .filter((d, dIndex) => dIndex > 0)
          .forEach((d, dIndex) => {
            const currentTypeEffectivementObj = dualTypeMap[`${firstType}${secondType}`];

            dualTypeMap[`${firstType}${secondType}`] = {
              ...currentTypeEffectivementObj,
              [`${ROW_LABEL[dIndex]}`]: TYPE_MAP[d.className],
            };
          });
      });

      res.send(JSON.stringify(dualTypeMap));
    });
  } catch (err) {}
});

app.use((req, res, next) => {});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
