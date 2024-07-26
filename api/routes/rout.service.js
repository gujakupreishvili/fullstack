const { readFile, writeFile } = require("../../utils");

const getAllUSers = async (req, res) => {
  try {
    const users = await readFile("users.json");
    res.status(200).json(users);
  } catch (error) {
    console.log("error");
  }
};
const addNewUser = async (req, res) => {
  try {
    const { product, price } = req.body;
    if (!product || !price) {
      return res
        .status(400)
        .json({ message: "Product and price are required" });
    }
    const users = await readFile("users.json");
    const lastId = users[users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      product,
      price,
    };
    users.push(newUser);
    await writeFile("users.json", users);
    // res.status(201).json(newUser);
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await readFile("users.json");
    const index = users.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const deleteUser = users.splice(index, 1);
    await writeFile("users.json", users);
    res.status(200).json(deleteUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { product, price } = req.body;
  const users = await readFile("users.json");
  const index = users.findIndex((el) => el.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  users[index] = {
    ...users[index],
    product: product ? product : users[index].product,
    price: price ? price : users[index].price,
  };
  await writeFile("users.json", users);
  res.status(201).json(users[index]);
};
module.exports = { getAllUSers, addNewUser, deleteUser, updateUser };
