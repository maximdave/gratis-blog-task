exports.paginatedResult = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = {};
    if (startIndex > 0) {
      data.previous = page - 1;
    }
    if (endIndex < (await model.countDocuments().exec())) {
      data.next = page + 1;
    }
    try {
      data.data = await model.find().limit(limit).skip(startIndex);
      res.paginatedResult = data;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
