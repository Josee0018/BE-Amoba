import express from "express";

import {
  deletePeopleById,
  getPeople,
  getPeopleById,
  getPeopleByEmail,
  createPerson,
} from "../db/people";

export const createPeople = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, name, lastname } = req.body;

    if (!email || !name || !lastname) {
      return res.sendStatus(400);
    }
    const existingPerson = await getPeopleByEmail(email);
    if (existingPerson) {
      return res.sendStatus(400);
    }
    const person = await createPerson({
      email,
      name,
      lastname,
    });
    return res.status(200).json(person).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllPeople = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const people = await getPeople();
    const transformedData = people.map(({ _id, name, lastname, email }) => ({
      id: _id,
      name,
      lastname,
      email,
    }));

    return res
      .status(200)
      .json({ total: transformedData.length, data: transformedData });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deletePeople = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedPeople = await deletePeopleById(id);

    return res.json(deletedPeople);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updatePeople = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { name, lastname } = req.body;

    if (!name || !lastname) {
      return res.sendStatus(400);
    }

    const person = await getPeopleById(id);

    person.name = name;
    person.lastname = lastname;
    await person.save();

    return res.status(200).json(person).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
