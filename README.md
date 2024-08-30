---

# Blog API

The Blog API is a backend service that powers a blog system. It allows users to create accounts, write and publish blog posts, blogs posts created by non-employees of an organization would require admin approval for CREATE, UPDATE and DELETE actions. This API is built using NodeJS, ExpressJS, and PostgreSQL.

## Features

- User registration: users can create accounts with their first name, last name, email address and password.
- User login: users can login to their accounts with their email address and password.
- Create blog: users can create blog posts, non-employees would require admin approval on said post before it goes live.
- Fetch blogs: unauthenticated users can view all blog posts.
- Fetch single blog: unauthenticated users can view the detail of a single blog post using either the slug or id.
- Fetch personal blogs: users can fetch all the blogs they've ever created.
- Fetch blog revisions: admins can fetch all revisions requested by non-employees.
- Evaluate blog revision: admins can approve or reject blog revisions.
- Delete blog: users can delete a blog post they created, admins can delete any blog.
- Update blog: users can update a blog post they created.
- Create organization: need another organization? admins can create an organization.
- Add employee: admins can add employees to an organization.
- Fetch organizations: admins can fetch all organizations.


## API Endpoints
### Authentication (users and admins)
- `POST /v1/auth/signup`: Register a new user account, an admin account already seeded in the database.
- `POST /v1/auth/signin`: Log in using email and password for both users and admins.

### Profile functionalities
- `GET /v1/profile`: Get the profile of the currently logged in user.

### Blog functionalities
- `POST /v1/blog`: Create a new blog post
- `GET /v1/blog`: Get all blog posts
- `GET /v1/blog/:blogIdOrSlug`: Get a single blog post by id or slug
- `GET /v1/blog/personal`: Get all blog posts created by the currently logged in user
- `GET /v1/blog/revision`: Get all blog revisions (admin only)
- `POST /v1/blog/revision/evaluate`: Accept or reject blog revisions (admin only)
- `DELETE /v1/blog/:blogId`: Delete a blog post
- `PUT /v1/blog/:blogId`: Update a blog post

### Organization functionalities
- `POST /v1/organization`: Create a new organization (admin only)
- `POST /v1/organization/employee`: Add an employee to an organization (admin only)

### Sanity checks
- `GET /v1/health`: Check the health of the API
 
## Database Setup:

   - Launch a PostgreSQL shell and login using `psql -U <username>`.
   - Create a new database using `CREATE DATABASE "blog_api";`.
   - Connect to the database using `\c blog_api`.
   - Run migrations with `npm run migrate`.

## Prerequisites

- Node.JS (v14.^.^ or higher)
- PostgreSQL database
- Postman for testing the API
- Docker for containerization

## Installation

1. Clone the repository:

```bash
git clone https://github.com/starlingvibes/blog-api.git
```

2. Navigate to the project directory:

```bash
cd blog-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and set the following environment variables:

```env
PORT=1337

NODE_ENV=development

# JWT secrets
JWT_KEY=

# Development database configuration
DEVELOPMENT_DB_USERNAME=
DEVELOPMENT_DB_PASSWORD=
DEVELOPMENT_DB_NAME=
DEVELOPMENT_DB_HOST=
DEVELOPMENT_DB_PORT=5432

# Production database configuration
PRODUCTION_DB_USERNAME=
PRODUCTION_DB_PASSWORD=
PRODUCTION_DB_NAME=
PRODUCTION_DB_HOST=
PRODUCTION_DB_PORT=5432

# Redis configuration
REDIS_URL=
```

5. Set up your PostgreSQL database with the provided configuration.

6. Start the server:

```bash
npm start
```

## Dockerization 

The API is containerized using Docker. A docker-compose.yaml file is provided in the repository. To build and run the Docker container:

```bash
docker compose up -d
```

## Postman Collection

You can find a Postman collection with example API requests in the `docs` directory. Import this collection into Postman to test the API endpoints.

## Swagger documentation

The API documentation is available at `/swagger` endpoint. You can view the documentation by navigating to `http://{{url}}/swagger` in your browser. The postman documentation is almost always more up-to-date than the swagger documentation, so you should use the postman documentation for the most accurate information.

## Contributing

Contributions to this project are welcome! Feel free to submit issues and pull requests.
For any inquiries or questions, feel free to contact [dera@ieee.org](mailto:dera@ieee.org).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
