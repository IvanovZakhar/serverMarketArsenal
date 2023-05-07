module.exports = function(app ) {
     
    // app.post('/notes', (req, res) => {
    //     // const myAwesomeDB = database.db('test')
        
    //     const note = { text: req.body.body, title: req.body.title };
    //     database.collection('notes').insert(note, (err, result) => {
    //       if (err) { 
    //         res.send({ 'error': 'An error has occurred' }); 
    //       } else {
    //         res.send(result.ops[0]);
    //       }
    //     });
    //   });

    app.post('/notes', (req, res) => {
      // const myAwesomeDB = database.db('test')
      const Schema = mongoose.Schema;
      const mySchema = new Schema({
        name: String,
        age: Number,
        email: String
      });
      const MyModel = mongoose.model('MyModel', mySchema);
      const myDoc = new MyModel({
        text: req.body.body, title: req.body.title 
      });
        myDoc.save()
        .then(savedDoc => {
          console.log('Документ сохранен:', savedDoc);
        })
        .catch(err => {
          console.error(err);
        });
      
    });





  }