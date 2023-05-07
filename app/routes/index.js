const noteRoutes = require('./note_routes');
module.exports = function(app ) {
  noteRoutes(app );
  // Тут, позже, будут и другие обработчики маршрутов 
};