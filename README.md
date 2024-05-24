Pokemon Translation API
Description

This project provides an API that integrates with the PokeAPI and FunTranslations API to retrieve Pokemon species data and translate their descriptions based on habitat and legendary status. It includes two main endpoints: one for fetching Pokemon data and another for fetching translated descriptions.
Features

    Fetch Pokemon Data: Retrieve data including name, description, habitat, and legendary status.
    Translate Descriptions: Automatically translate descriptions using Yoda or Shakespeare style based on the Pokemon's characteristics.

Technologies Used

    Node.js
    Express
    Axios for API requests
    Jest for testing
    TypeScript

Installation

Clone the repository and install the dependencies to get started:
git clone https://github.com/yourusername/codingchallengemeandu.git

cd codingchallengemeandu

npm install

Usage

Start the server by running:
npm start

Endpoints
Get Pokemon Data

    URL: /pokemon/:name
    Method: GET
    URL Params: name=[string] (Pokemon species name)
    Success Response:
        Code: 200
        Content:

        json

        {
          "name": "pikachu",
          "description": "Loves to eat apples.",
          "habitat": "forest",
          "isLegendary": false
        }

Get Translated Pokemon Description

    URL: /pokemon/translate/:name
    Method: GET
    URL Params: name=[string] (Pokemon species name)
    Success Response:
        Code: 200
        Content:

        json

        {
          "name": "pikachu",
          "description": "Methinks it doth love to munch on apples.",
          "habitat": "forest",
          "isLegendary": false,
          "translationApplied": "shakespeare"
        }

Testing

Run the automated tests for this system:
npm test

Thought Process and Trade-offs
Thought Process

    API Integration: The primary focus was on integrating two external APIs (PokeAPI and FunTranslations) efficiently and ensuring the data retrieved is accurate and useful.
    Error Handling: Extensive error handling was implemented to ensure the application behaves predictably under various failure scenarios, such as network issues or invalid inputs.
    Modularity: The application is structured to ensure that different concerns (like API calls and business logic) are separated, making the code easier to maintain and extend.

Trade-offs

    Performance vs. Readability: Chose readability and maintainability over highly optimized code since this is a small-scale project. However, caching strategies could be implemented to enhance performance.
    Simple Error Responses: Kept error responses simple and user-friendly. More detailed error logging could be added for production use.
    Synchronous Requests: Sequential API requests were used to simplify logic. For production, consider parallel requests to reduce latency.

Potential Enhancements

    Caching: Implement caching for PokeAPI responses to reduce API calls and improve performance.
    Rate Limiting: Add rate limiting to handle API rate limits gracefully and avoid hitting external API limits.
    Advanced Error Handling: Implement more sophisticated error handling and logging for better observability in production.
    Scalability: For production, consider scaling the application using a load balancer and deploying it in a containerized environment like Docker.

Consistency and Naming

    Used consistent naming conventions throughout the codebase to improve readability and maintainability.
    Structured the project directories logically to separate concerns and make the codebase easy to navigate.

Running the Solution

To ensure the solution is easy to run:

    Compatibility: The project is configured to run on both PC and Mac environments.
    Documentation: Provided clear instructions for setting up and running the project in this README.
    Scripts: Included npm scripts for common tasks like starting the server and running tests.

License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Contact

For any questions, please contact Marco Aerlic at aerlic7@gmail.com
