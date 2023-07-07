import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  age: number;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
