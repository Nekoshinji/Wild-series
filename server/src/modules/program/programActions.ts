// Some data to make the trick

import type { RequestHandler } from "express";
import ProgramRepository from "./ProgramRepository";

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all programs
    const programs = await ProgramRepository.readAll();

    // Respond with the programs in JSON format
    res.json(programs);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific program based on the provided ID
    const programsId = Number(req.params.id);
    const programs = await ProgramRepository.read(programsId);

    // If the programs is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the programs in JSON format
    if (programs == null) {
      res.sendStatus(404);
    } else {
      res.json(programs);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific category based on the provided ID
    const programs = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
    };

    const affectedRows = await ProgramRepository.update(programs);

    // If the programs is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the programs in JSON format
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the programs data from the request body
    const newPrograms = {
      id: Number(req.params.id),
      title: req.body.title,
    };

    // Create the programs
    const insertId = await ProgramRepository.create(newPrograms);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific programs based on the provided ID
    const programsId = Number(req.params.id);

    await ProgramRepository.delete(programsId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title } = req.body;

  // put your validation rules here
  if (title === "") {
    errors.push({ field: "title", message: "The field is required" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy, validate };
