exports.addTodo = (title, subtitle, content) => {
  if (!title | !content) {
    return false;
  }
  return true;
};

exports.deleteTodo = (todoId) => {
  if (!todoId) {
    return false;
  }
  return true;
};

exports.getSingleTodo = (todoId) => {
  if (!todoId) {
    return false;
  }
  return true;
};
