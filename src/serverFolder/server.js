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

app.locals.favorites = {
    userID: {
        favoriteMovies: ["Cool Runnings", "The Bride of Chucky", "Ace Ventura 2"], 
    },
    secondUserID: {
        favoriteMovies: ["The Godfather", "The Color Purple"]
    }


};

app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`)
});

app.get('/' , (request, response) => {
    response.status(200).send(app.locals.comments)
});

app.get("/api/v1/comments/:id/:movieId", (request, response) => {

    let user = request.params.id;
    let movie = request.params.movieId;
    let dataset = app.locals.comments;

    if ( dataset[user] ) {

        if ( dataset[user].commentedMovies ) {
            return dataset[user].commentedMovies[movie] ? 
                response.status(200).json(dataset[user].commentedMovies[movie]):
                response.status(404).send("Sorry, you don't have any comments for this movie.")
    
        } else {
            response.status(404).send("Sorry, you have not commented on any movies.")
        }
    } else {
        response.status(404).send("Sorry, we could not find any data.")
    }
});

app.get("/api/v1/favorites/:id", (request, response) => {
    let user = request.params.id;
    let dataset = app.locals.favorites;

    if ( dataset[user] ) {
        return dataset[user].favoriteMovies ? 
            response.status(200).json(dataset[user].favoriteMovies):
            response.status(404).send("Sorry, you don't have any favorite movies.")
    } else {
        response.status(404).send("Sorry, we could not find any data.")
    }
});

// in the process of creating a for..of loop for updating comments// i suppose it doesnt need it.

app.post("/api/v1/comments/:id/:movieId", (request, response) => {
    let user = request.params.id;
    let movie = request.params.movieId;
    let dataset = app.locals.comments;
    const { comment, name } = request.body;

    for (let requiredParameter of ['comment', 'name']) {
        response.status(422).send(`Missing ${requiredParameter}!`)
    }

    // if (!comment) {
    //     response.status(422).send("Missing comment!")
    // }

    // if (!name) {
    //     response.status(422).send("Missing namme!")
    // }
});




 