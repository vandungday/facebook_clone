exports.home = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "hello world",
  });
};

exports.books = (req, res) => {
  res.send("BOOKS");
};
