const fs = require("fs");
const express = require("express");
var app = express();
const path = require("path");
const port = 4000;

const homeHTML = fs.readFileSync("./index.html", "utf-8");
const helperJSON = fs.readFileSync("./helper.json", "utf-8");
const helperHTML = fs.readFileSync("./connect.html", "utf-8");
const helerList = fs.readFileSync("./helperList.html", "utf-8");
const itemList = fs.readFileSync("./category/item.html", "utf-8");
//const sofaList = fs.readFileSync("./category/views/sofa.twig", "utf-8");
const chairJSON = fs.readFileSync("./category/chair.json", "utf-8");
const sofaJSON = fs.readFileSync("./category/sofa.json", "utf-8");
const furTemp = fs.readFileSync("./category/furnitureTemplate.html", "utf-8");
const helperData = JSON.parse(helperJSON);

//replace function for helperList.html
const replaceTemplates = (temp, helper) => {
  let output = temp.replace(/{%S_No%}/g, helper.si_n);
  output = output.replace(/{%NAME%}/g, helper.name);
  output = output.replace(/{%CONTACT%}/g, helper.contact);
  output = output.replace(/{%EMAIL%}/g, helper.email);

  return output;
};

const chairData = JSON.parse(chairJSON);
const sofaData = JSON.parse(sofaJSON);
// replace function for chair.html
const replaceItem = (temp, item) => {
  let output = temp.replace(/{%IMAGE_SRC%}/g, item.imgagesrc);
  output = output.replace(/{%BUY_REF%}/g, item.buyref);
  output = output.replace(/{%PRICE%}/g, item.price);
  output = output.replace(/{%ITEM_NAME%}/g, item.item_name);
  output = output.replace(/{%BRAND_NAME%}/g, item.brand_name);
  output = output.replace(/{%DETAILS_REF%}/g, item.details_ref);

  return output;
};
//static use for gobally available folder
app.use("/public", express.static(__dirname + "/public"));
app.use("/furniture_image", express.static(__dirname + "/furniture_image"));
app.use("/category", express.static(__dirname + "/category/views"));
//app.set("engine view", "twig");
//app.set("views", "category/views");
//console.log(sofaList);
//app.set();
app.use("/furniture_image", express.static(__dirname + "/furniture_image"));

// home page loading
const homePage = (req, res) => {
  res.send(homeHTML);
};
// helperList loading to provide service
const servicePage = (req, res) => {
  const helper = helperData.map((el) => replaceTemplates(helerList, el));
  let output = furTemp.replace(/{%FURNITURE%}/g, helper);
  res.send(output);
};
//chair menuItem in navbar loading
const chairMenuItem = (req, res) => {
  const chair = chairData.map((el) => replaceItem(itemList, el));
  let output = furTemp.replace(/{%FURNITURE%}/g, chair);
  res.send(output);
};
// sofa menuItem in navbar loading
const sofaMenuItem = (req, res) => {
  const chair = sofaData.map((el) => replaceItem(itemList, el));
  let output = furTemp.replace(/{%FURNITURE%}/g, chair);
  res.send(output);
};
app.get("/", homePage);
app.get("/index", homePage);
app.get("/home", homePage);
app.get("/Connect", servicePage);
app.get("/chair", chairMenuItem);
app.get("/sofa", sofaMenuItem);
app.listen(port, () => {
  console.log(`app is running form ${port}`);
});
