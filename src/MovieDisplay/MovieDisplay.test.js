import React from 'react';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import App from '../App/App';

import { render, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { getMovieData, getAllMovies } from '../apiCalls';

jest.mock('../apiCalls');

describe('MovieDisplay', () => {

    getAllMovies.mockResolvedValue({ movies: [{
        "id": 475430,
        "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
        "title": "Artemis Fowl",
        "average_rating": 6.333333333333333,
        "release_date": "2020-06-12"
        },
        {
        "id": 338762,
        "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//lP5eKh8WOcPysfELrUpGhHJGZEH.jpg",
        "title": "Bloodshot",
        "average_rating": 9.5,
        "release_date": "2020-03-05"
      }]});

    getMovieData.mockResolvedValue([{
        movie: {
            average_rating: 5.666666666666667,
            backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
            budget: 125000000,
            genres: ["Adventure", "Fantasy", "Science Fiction", "Family"],
            id: 475430,
            overview: "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father's disappearance.",
            poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
            release_date: "2020-06-12",
            revenue: 0,
            runtime: 95,
            tagline: "Remember the name",
            title: "Artemis Fowl"
        },
        videos: [{
            id: 106,
            key: "wXlBep9uFjI",
            movie_id: 475430,
            site: "YouTube",
            type: "Teaser",
        },
        {
            id: 107,
            key: "fl2r3Fwxz_o",
            movie_id: 475430,
            site: "YouTube",
            type: "Trailer",
        }]
    }])

    it('should render a movie display', async() => {
        const { getByText } = render( 
            <MemoryRouter>
              <App />
            </MemoryRouter>);

         render( 
        <MemoryRouter>
            <MovieDisplay />
        </MemoryRouter> )

        const header = await waitFor(() => getByText('Rancid Tomatillos'))
        expect(header).toBeInTheDocument()

        const movieTitle = await waitFor(() => getByText("Artemis Fowl", {exact: false}))

        expect(movieTitle).toBeInTheDocument()
    });

    it.skip('should display movie rating if logged in', async () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );
        const { getByText, debug } = render(
            <MemoryRouter>
                <MovieDisplay 
                    allMovies={getAllMovies.mockResolvedValue()}
                    movieID={475430}
                    userInfo={{id: 56}}
                    ratings={[{
                        "id": 1319,
                        "user_id": 56,
                        "movie_id": 475430,
                        "rating": 2,
                        "created_at": "2020-07-12T23:13:01.015Z",
                        "updated_at": "2020-07-12T23:13:01.015Z"
                        }]}
                    getUserRatings={jest.fn()}
                    loggedIn={true}
                />
            </MemoryRouter>
        )
        debug()
        const movieRating = await waitFor(() => getByText('Rating: 2'))
        expect(movieRating).toBeInTheDocument()
    });
});