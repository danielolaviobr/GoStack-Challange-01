const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const data = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(data);

  return response.status(200).json(data);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  const data = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories.splice(repositoryIndex, 1);

  repositories.push(data);

  return response.status(200).json(data);
});

app.delete("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json({ message: "Repo Deleted" });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
