module.exports = function(router, db) {
  router
    .route('/')
    .get(handleGet, handlerError)
    .post(handlePost, handlerError);

  router
    .route('/:id')
    .get(handleGet, handlerError)
    .post(handlePost, handlerError)
    .put(isIDValid, hanldePut, handlerError)
    .delete(isIDValid, handleDelete, handlerError);

  /**
   * HTTP request handlers: these are the handlers for HTTP Verbs.
   */
  function handleGet(req, res, next) {
    const { id } = req.params;

    db
      /**
       * If ID undefined: get all data.
       * else: get the specified Id.
       */
      .get(Number(id))
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        emitError(e);
        next(e);
      });
  }
  function handlePost(req, res, next) {}
  function hanldePut(req, res, next) {}
  function handleDelete(req, res, next) {}
  /**
   * Error handler: a middlewear to handle Erros.
   */
  function handlerError(err, req, res, next) {
    res.status(err.status).json(err.message);
    next();
  }
  /**
   * Others: Helper middlewears
   */
  function isIDValid(req, res, next) {
    const { id } = req.params;
    // id match only digits -> if 'id' is a number
    if (/^\d+$/.test(id)) {
      db
        .get(Number(id))
        .then(response => {
          next();
        })
        .catch(e => {
          emitError(e, 500);
          next(e);
        });
    } else {
      // Create an Erro instance to hanldle a custom error.
      const e = new Error();
      emitError(e, 400, 'Wrong Id: Id must be a number');
      next(e);
    }
  }
  function areArgumentsValid(req, res, next) {}

  //This function add some properties to an Error object
  function emitError(e, code = 500, message = 'Ups, there were a problem fetching the info from the database') {
    console.log(e);
    e.status = code;
    e.message = message;
  }
};
