const express = require('express');

const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3002);

app.locals.comments = [
{
    userID: {
        name: 'Cool User Name', 
        commentedMovies: {
            movieID: [
                "A comment about a movie!", 
                "Another comment about the same movie...", 
                "Third comment just to make sure?"
            ]
    }
}, 
    userID2: {
        name: 'Second User',
        commentedMovies: {
            movieID: [
                "This movie will only have two comments.",
                "See, I told you!"
            ]
        }
    }
}];

app.locals.favorites = [{test2: 'favorites test'}];

app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`)
});

app.get('/' , (request, response) => {
    response.status(200).send(app.locals.comments)
});

app.get('/api/v1/comments/:id', (request, response) => {
    const userID = request.params.id;
    const foundUser = app.locals.comments.find((user) => userID === user.id );
    // how should this be set up?
    // user comments object should look like what?
    //
    // maybe ...locals.comments

    return foundUser ? response.status(200).json(foundUser)
});

