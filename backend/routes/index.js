const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");
const { User } = require("../models/users/user");

const routes = (app) => {
  // ミドルウェアの設定
  app.use(morgan("combined")); // 詳細なログ形式。他にも "dev" などのオプションあり。
  app.use(express.json()); // JSONボディパーサーを追加

  const router = express.Router();

  // 共通の成功/エラーレスポンス処理
  const handleSuccess = (res, data) => serverResponses.sendSuccess(res, messages.SUCCESSFUL, data);
  const handleError = (res, error, message = messages.BAD_REQUEST) => serverResponses.sendError(res, message, error);

  // Todo作成
  router.post("/todos", async (req, res) => {
    try {
      const todo = new Todo({
        text: req.body.text,
      });
      const result = await todo.save();
      handleSuccess(res, result);
    } catch (error) {
      handleError(res, error);
    }
  });

  // ユーザー登録
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, email });
      const result = await user.save();
      handleSuccess(res, result);
    } catch (error) {
      handleError(res, error);
    }
  });

  // 全Todoの取得
  router.get("/todos", async (req, res) => {
    try {
      const todos = await Todo.find({}, { __v: 0 });
      handleSuccess(res, todos);
    } catch (error) {
      handleError(res, error);
    }
  });

  // 全ユーザーの取得
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, { __v: 0 });
      handleSuccess(res, users);
    } catch (error) {
      handleError(res, error);
    }
  });

  // Todo削除
  router.delete("/todos/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findByIdAndRemove(id);
      if (!todo) {
        handleError(res, null, messages.NOT_FOUND);
      } else {
        handleSuccess(res, todo);
      }
    } catch (error) {
      handleError(res, error);
    }
  });

  // user削除
  router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await User.findByIdAndRemove(id);
      if (!todo) {
        handleError(res, null, messages.NOT_FOUND);
      } else {
        handleSuccess(res, todo);
      }
    } catch (error) {
      handleError(res, error);
    }
  });

  // ルートのプレフィックス設定
  app.use("/api", router);
};

module.exports = routes;
