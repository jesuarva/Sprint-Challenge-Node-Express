module.exports = function(router, db) {
  router
    .route('/')
    .get(isIDValid, handleGet, handlerError)
    .post(isIDValid, handlePost, handlerError);

  router
    .route('/:id')
    .put(hanldePut, handlerError)
    .delete(handleDelete, handlerError);

  /**
   * HTTP request handlers: these are the handlers for HTTP Verbs.
   */
  function handleGet(req, res, next) {}
  function handlePost(req, res, next) {}
  function hanldePut(req, res, next) {}
  function handleDelete(req, res, next) {}
  /**
   * Error handler: a middlewear to handle Erros.
   */
  function handlerError(err, req, res, next) {}
  /**
   * Others: Helper middlewears
   */
  function isIDValid(req, res, next) {}
  function areArgumentsValid(req, res, next) {}
};
