const jobSchema = require("../schemas/jobSchema");
const sanitizedString = require("../utilities/sanitizedString");

const getSearchResult = async (req, res, next) => {
  try {
    const { keyword, location, category } = req.query;

    const searchResult = await jobSchema.find({
      $or: [
        { title: { $regex: sanitizedString(keyword), $options: "i" } },
        { description: { $regex: sanitizedString(keyword), $options: "i" } },
        { address: { $regex: sanitizedString(location), $options: "i" } },
        { category: { $regex: category } },
      ],
    });
    res.status(200).json({ searchResult });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = getSearchResult;
