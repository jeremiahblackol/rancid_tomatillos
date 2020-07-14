const express = require('express');

const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3002);

app.locals.comments = {
        userID: {
            name: 'Cool User Name', 
            commentedMovies: {
                movieID: [
                    "A comment about a movie!", 
                    "Another comment about the same movie...", 
                    "Third comment just to make sure?"
                ],
                anotherMovieID: [
                    "Testing things out",
                    "This movie was awesome!"
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
};

app.locals.favorites = [{test2: 'favorites test'}];

app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`)
});

app.get('/' , (request, response) => {
    response.status(200).send(app.locals.comments)
});

const routeURL = "/api/v1/"

//making this more dynamic so that we can access the app.locals.whatever for each request

app.get(`${routeURL}:location/:id/:movieId`, (request, response) => {
    let user = request.params.id;
    let movie = request.params.movieId;

    // this will set which dataset point we want to access whether we are GET favorites or comments
    let location = request.params.location === "comments" ? app.locals.comments : app.locals.favorites;


    let userLocation = app.locals.comments[user];

    if ( userLocation ) {
        return userLocation.commentedMovies[movie] ? 
            response.status(200).json(userLocation.commentedMovies[movie]):
            response.status(404).send("Sorry, you don't have any comments for this movie.")
    } else {
        response.status(404).send("Sorry, you have not made any comments yet.")
    }     
});

app.post('/api/v1/comments/:id/:movieId', (request, response) => {


    // let user = request.params.id;
    // let movie = request.params.movieId;

    // let userLocation = app.locals.comments[user];

    // if ( userLocation ) {
    //     return userLocation.commentedMovies[movie] ? 
    //         response.status(200).json(userLocation.commentedMovies[movie]):
    //         response.status(404).send("Sorry, you don't have any comments for this movie.")
    // } else {
    //     response.status(404).send("Sorry, you have not made any comments yet.")
    // }     
});

