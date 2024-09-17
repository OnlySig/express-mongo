import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => value.trim() !==  "", //O método trim() remove espaços em branco no início e no final de uma string.
  message: ({ path })=> `O campo ${path} NÃO é opcional!`
});