const mocha = require("mocha");
const chai = require("chai");

const todoUtils = require("../utils/todoutils");

const expect = chai.expect;

describe("todoUtils", function () {
  // CREATE Ops Tests
  it("Expected To not create a TODO", () => {
    let todo = todoUtils.addTodo("this is title");
    expect(todo).to.equal(false);
  });

  it("Expected to not create a TODO, Invalid Prameters", () => {
    let todo = todoUtils.addTodo("This is tile", "This is subtitle");
    expect(todo).to.equal(false);
  });

  it("Expected To Create a TODO", () => {
    let todo = todoUtils.addTodo("Title", "Subtitle", "Contenet ");
    expect(todo).to.equal(true);
  });

  // READ Ops Tests
  it("Expected to Get a Single TODO", () => {
    let todo = todoUtils.getSingleTodo("123e12edasojn2e1e12");
    expect(todo).to.equal(true);
  });

  // DELETE Ops Tests
  it("DELETE A TODO, VALID PARAMETERS", () => {
    let todo = todoUtils.deleteTodo("123e12edasojn2e1e12");
    expect(todo).to.equal(true);
  });
  it("DELETE A TODO, INVALID PARAMETERS", () => {
    let todo = todoUtils.deleteTodo();
    expect(todo).to.equal(false);
  });
});
