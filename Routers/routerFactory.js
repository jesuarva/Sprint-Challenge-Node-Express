module.exports = function(router, db) {
  router
    .route('/')
    .get(handleGet, handlerError)
    .post(areArgumentsValid, handlePost, handlerError);

  router
    .route('/:id')
    .get(handleGet, handlerError)
    .put(isIDValid, areArgumentsValid, hanldePut, handlerError)
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
  function handlePost(req, res, next) {
    const { ...obj } = req.obj;
    db
      .insert(obj)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        emitError(e, 500);
        next(e);
      });
  }
  function hanldePut(req, res, next) {
    const { id } = req.params;
    const { ...body } = req.body;
    db
      .update(Number(id), body)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        emitError(e);
        next(e);
      });
  }
  function handleDelete(req, res, next) {
    const { id } = req.params;
    db
      .remove(id)
      .then(response => {
        res.status(200).json('The register was deleted!');
      })
      .catch(e => {
        emitError(e);
        next(e);
      });
  }
  /**
   * Error handler: a middlewear to handle Erros.
   */
  function handlerError(err, req, res, next) {
    !err.status ? next(err) : res.status(err.status).json(err.message);
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
          emitError(e, 500, 'There are no data with this Id');
          next(e);
        });
    } else {
      // Create an Erro instance to hanldle a custom error.
      const e = new Error();
      emitError(e, 400, 'Wrong Id: Id must be a number');
      next(e);
    }
  }
  function areArgumentsValid(req, res, next) {
    const { id, name, description, completed, project_id, notes } = req.body;

    switch (req.baseUrl) {
      case '/actions':
        switch (req.method) {
          case 'POST':
            if (description && completed && project_id && notes) {
              // Send obj with content
              req.obj = { description, completed, project_id, notes };
              next();
            } else {
              const e = new Error();
              emitError(e, 400, 'Please, give value for all of these: description, completed, project_id and notes');
              next(e);
            }
            break;
          case 'PUT':
            if (description || completed || project_id || notes) {
              next();
            } else {
              const e = new Error();
              emitError(
                e,
                400,
                'Please, give value for at least one of these: description, completed, project_id and notes'
              );
              next(e);
            }
            break;
        }
        break;

      case '/projects':
        switch (req.method) {
          case 'POST':
            if (description && completed && name) {
              // Send obj with content
              req.obj = { description, completed, name };
              next();
            } else {
              const e = new Error();
              emitError(e, 400, 'Please, give value for all of these: description, completed and name');
              next(e);
            }
            break;
          case 'PUT':
            if (description || completed || name) {
              next();
            } else {
              const e = new Error();
              emitError(e, 400, 'Please, give value for at least one of these: description, completed and name');
              next(e);
            }
            break;
        }
        break;
    }
  }

  //This function add some properties to an Error object
  function emitError(e, code = 500, message = 'Ups, there were a problem fetching the info from the database') {
    console.log(e);
    e.status = code;
    e.message = message;
  }
};
