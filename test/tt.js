// command.js

function parseCommand(queryString) {
  const params = new URLSearchParams(queryString);

  const formessage = params.get("formessage");
  const example = params.get("example");

  if (!formessage || !example) {
    return "Bhai kuch daal";
  }

  return {
    formessage: formessage,
    example: example
  };
}