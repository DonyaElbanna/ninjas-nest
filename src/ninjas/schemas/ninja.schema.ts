import * as mongoose from 'mongoose';

export const NinjaSchema = new mongoose.Schema({
  name: String,
  weapon: String,
  type: String,
});
