const router = require("express").Router();
const { body, param } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const todoController = require("../controllers/todo");

router.get("/", todoController.getAllTodos);

router.get(
  "/:todoId",
  param("todoId").custom(async (value) => {
    console.log(value, "This is the default Value!!");
    if (!ObjectId.isValid(value)) {
      throw new Error("Invalid Todo Id");
    }
  }),
  todoController.getSingleTodo
);

router.post(
  "/",
  [
    body("title", "Please enter a valid title")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 })
      .withMessage("Invalid Title"),
    body("subtitle", "Please enter a valid Subtitle")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 }),
    body("content", "Please enter a valid Content")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 }),
  ],
  todoController.createTodo
);

router.patch(
  "/:todoId",
  param("todoId").custom(async (value) => {
    console.log(value, "This is the default Value!!");
    if (!ObjectId.isValid(value)) {
      throw new Error("Invalid Todo Id");
    }
  }),
  [
    param("todoId", "Invalid TodoId").trim().isLength({ min: 5 }),
    body("title", "Please enter a valid title")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 }),
    body("subtitle", "Please enter a valid Subtitle")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 }),
    body("content", "Please enter a valid Content")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 5 }),
  ],
  todoController.updateTodo
);
router.delete(
  "/:todoId",
  param("todoId").custom(async (value) => {
    if (!ObjectId.isValid(value)) {
      throw new Error("Invalid Todo Id");
    }
  }),
  todoController.deleteTodo
);

module.exports = router;
