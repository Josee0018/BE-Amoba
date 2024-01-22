import mongoose from "mongoose";

// People Config
const PeopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
});

export const PeopleModel = mongoose.model("People", PeopleSchema);

// People Actions
export const getPeople = () => PeopleModel.find();
export const getPeopleByEmail = (email: string) =>
  PeopleModel.findOne({ email });
export const getPeopleById = (id: string) => PeopleModel.findById(id);
export const createPerson = (values: Record<string, any>) =>
  new PeopleModel(values).save().then((person) => person.toObject());
export const deletePeopleById = (id: string) =>
  PeopleModel.findOneAndDelete({ _id: id });
export const updatePeopleById = (id: string, values: Record<string, any>) =>
  PeopleModel.findByIdAndUpdate(id, values);
