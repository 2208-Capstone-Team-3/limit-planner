import app from "./app.js";

const init = async () => {
  try {
    const port = process.env.PORT || 3210;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
