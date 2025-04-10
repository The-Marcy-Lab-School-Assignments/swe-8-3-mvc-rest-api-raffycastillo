const Journal = require('../models/Journal.js')

const serveEntries = (req, res) => {
  res.send(Journal.list());
}

const serveEntry = (req, res) => {
  const { id } = req.params;
  const entry = Journal.find(parseInt(id));
  if (!entry) return res
    .status(404)
    .json({
      "message": "Entry (by id) does not exist. Failed to fetch resource."
    })
  return res
    .status(200)
    .send(entry);
}

const createEntry = (req, res) => {
  const { text, imgSrc } = req.body;
  if (!text) return res
    .status(404)
    .json({
      "message": "Must provide `text` when creating an entry. Failed to create resource."
    })
  const newEntry = Journal.create(text, imgSrc);
  return res
    .status(201)
    .json(newEntry);
}

const updateEntry = (req, res) => {
  const { id } = req.params;
  const { text, imgSrc } = req.body;
  const editedEntry = Journal.editEntry(parseInt(id), text, imgSrc);
  if (!editedEntry) return res
    .status(404)
    .json({
      "message": "Entry (by id) does not exist. Failed to update resource."
    })
  return res
    .status(200)
    .send(editedEntry);
}

const deleteEntry = (req, res) => {
  const { id } = req.params;
  const isDeleted = Journal.delete(parseInt(id));
  if (!isDeleted) return res
    .status(404)
    .json({
      "message": "Entry (by id) does not exist. Failed to delete resource."
    })
  return res
    .status(200)
    .json({
      "message": `Successfully deleted entry with id:${id}!`
    });
}

module.exports = {
  serveEntries,
  serveEntry,
  createEntry,
  updateEntry,
  deleteEntry
}
