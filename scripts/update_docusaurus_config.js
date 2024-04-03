const fs = require("fs");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const docusaurusConfigFile = "docusaurus.config.js";
const versionsJSONFile = "versions.json";
const tempDirectory = process.argv[2];
const baseDirectory = process.argv[3];

// This reads the docusaurus.config.js file and parses it into an AST.
// We need to parse it into an AST so that we can add the new versions to the config object.
// This is how we dynamically add the new versions to the config object.
const configCode = fs.readFileSync(
  `${baseDirectory}/${docusaurusConfigFile}`,
  "utf8"
);
const ast = parser.parse(configCode, {
  sourceType: "module",
});

// This function takes in a "versionsObject" parameter and updates it with new properties based on the "versionsArray" and "versionsOverride" arrays
const updateVersionsObject = (versionsObject) => {
  // Loop through each version in the "versionsArray"
  versionsArray.forEach((version) => {
    // Find the corresponding object in the "versionsOverride" array, or use an empty object if not found
    const override =
      versionsOverride.find((item) => item.version === version) || {};

    // Get the "banner" and "label" values from the override object, or use default values if not found
    const bannerValue = override.banner || "none";
    const labelValue = override.label || `v${version}`;

    // Create a new object property with the version as the key and an object expression as the value
    const versionProperty = t.objectProperty(
      t.stringLiteral(version),
      t.objectExpression([
        t.objectProperty(t.identifier("banner"), t.stringLiteral(bannerValue)),
        t.objectProperty(t.identifier("label"), t.stringLiteral(labelValue)),
      ])
    );

    // Add the new object property to the "properties" array of the "versionsObject" parameter
    versionsObject.properties.push(versionProperty);
  });
};

// This creates an array that contains all the versions that are in the versions.json file.
// The versions.json file is created by the bash script (versions.sh) that runs before this one.
let versionsArray = [];
try {
  const versionsJson = fs.readFileSync(versionsJSONFile, "utf8");
  versionsArray = JSON.parse(versionsJson);
} catch (err) {
  console.error("Could not read versions.json:", err);
}

// This creates an array that contains all the versions that are in the versionsOverride.json file.
// The versionsOverride.json file is a manually created file that allows us to override the banner and label for a specific version.
// If the version is not in the versionsOverride.json file, then the banner will be set to 'none' and the label will be the version number.
let versionsOverride = [];
try {
  const versionsOverrideJson = fs.readFileSync(
    `${baseDirectory}/versionsOverride.json`,
    "utf8"
  );
  versionsOverride = JSON.parse(versionsOverrideJson);
} catch (err) {
  console.error("Could not read versionsOverride.json:", err);
}

// This is where the main logic starts and the entry point for the script.
// This code searches for the object containing the versions of the main documentation in a Docusaurus config file.
// It loops through the nodes in the abstract syntax tree (AST) of the file and finds the "config" declaration.
// It then finds the "presets" property in the "config" declaration and gets the object it's called on.
// Inside of the "presets" object, it finds the "docs" property and gets the object it's called on.
// Inside of the "docs" object, it finds the "versions" property and gets the object it's called on.
let mainDocsVersionsObject;

// Loop through the nodes in the AST of the file
ast.program.body.forEach((node) => {
  // Find the "config" declaration
  if (
    node.type === "VariableDeclaration" &&
    node.declarations[0].id.name === "config"
  ) {
    // Find the "presets" property in the "config" declaration and get the object it's called on
    mainDocsVersionsObject = node.declarations[0].init.properties
      .find((prop) => prop.key.name === "presets")
      .value.elements[0].elements[1].properties.find(
        (prop) => prop.key.name === "docs"
      )
      .value.properties.find((prop) => prop.key.name === "versions").value;
  }
});
// Update the main docs versions object
updateVersionsObject(mainDocsVersionsObject);

// This is where the new config object is converted back into code.
const updatedCode = generate(ast).code;
try {
  // Lastly, this is where the new config object is written to the temp.docusaurus.config.js file.
  fs.writeFileSync(`${tempDirectory}/temp.docusaurus.config.js`, updatedCode);
} catch (err) {
  console.error("Could not write to temp.docusaurus.config.js:", err);
}
