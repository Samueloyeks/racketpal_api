exports.create = (async (_, res) => {
    setTimeout(() => res.status(200).json({
      status: "success",
    }), 2000)
});

exports.join = (async (_, res) => {
  setTimeout(() => res.status(200).json({
    status: "success",
  }), 2000)
});

exports.invite = (async (_, res) => {
  setTimeout(() => res.status(200).json({
    status: "success",
  }), 2000)
});

exports.accept = (async (_, res) => {
  setTimeout(() => res.status(200).json({
    status: "success",
  }), 2000)
});
