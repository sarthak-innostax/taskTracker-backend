const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
const Todo = require("../models/todo");
const logger = require("../utils/logger");

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ status: "SUCCESS", todos });
  } catch (error) {
    console.log(error);
    const err = new Error("Could not get TODOs");
    err.httpStatusCode = 500;
    next(err);
  }
};

exports.getSingleTodo = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
      logger.info({ message: "UPLOADING IMAGE TO DB", todoId: req.params.todoId });
      return res
        .status(422)
        .json({ status: "ERROR", errors: errors.array()[0] });
    }

    const todo = await Todo.findById(req.params.todoId);

    if (!todo) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Todo not found!" });
    }

    res.status(200).json({ status: "SUCCESS", todo });
  } catch (error) {
    console.log(error);
    const err = new Error("Could not get TODO");
    err.httpStatusCode = 500;
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ status: "ERROR", errors: errors.array()[0].msg });
    }

    const { title, subtitle, content } = req.body;

    let result;

    let file;

    if (req.files) {
      file = req.files.image;
      console.log(req.body);
      console.log(file);
      logger.info({ message: "UPLOADING IMAGE TO DB", todoId: "" });
      result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "todos",
        unique_filenfame: true,
        transformation: {
          responsive: true,
          width: "auto",
          crop: "crop",
          aspect_ratio: 16 / 9,
        },
      });
    }

    const todo = new Todo({
      title,
      subtitle,
      content,
    });

    if (result) {
      image = {
        id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    await todo.save();
    logger.info({ message: "TODO IS CREATED", todoId: todo._id });
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Todo is Created Successfully!" });
  } catch (error) {
    console.log(error);
    const err = new Error("Could not create TODO");
    err.httpStatusCode = 500;
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      logger.info({ message: "REQUESTED TODO NOT FOUND", todoId });
      return res
        .status(400)
        .json({ status: "ERROR", message: "No todo to update!" });
    }

    const { title, subtitle, content } = req.body;

    todo.title = title;
    todo.subtitle = subtitle;
    todo.content = content;
    await todo.save();
    logger.info({ message: "TODO IS UPDATED", todoId: todo._id });
    res
      .status(200)
      .json({ status: "SUCCESS", message: "Todo Updated Successfully!" });
  } catch (error) {
    console.log(error);
    const err = new Error("Could not Update Todo");
    err.httpStatusCode = 500;
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByIdAndRemove(todoId);

    if (!todo) {
      logger.info({ message: "REQUESTED TODO NOT FOUND", todoId: todoId });
      return res
        .status(404)
        .json({ status: "ERROR", message: "Todo not Found!" });
    }
    logger.info({ message: "DELETED TODO", todoId: todo._id });
    res.status(200).json({ status: "SUCCESS", message: "Deleted Todo", todo });
  } catch (error) {
    const err = new Error("Could not Delete Todo");
  }
};
