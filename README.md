# Artlog

The app is built using the MVC pattern, the technologies applied are mainly Express and Sequelize.
The app is designed to be easy to use and understand, and it is intended for artists to use. The app allows artists to upload their work, add tags to their work, and share their work with other artists. The app also allows artists to view other artists' work and comment on it.

The app is currently in development, and it is not yet ready for production use.

## Features

- Users can login and register
- Artists can upload their work
- Artists can add tags to their work

## Installation & usage

1. Clone the repository
```bash
git clone https://github.com/diegohpezet/artlog.git
```

2. Install the dependencies
```bash
npm install
```

1. Create a .env file and add the following information
```env
# Database
DB_HOST = your_db_host
DB_NAME = your_db_name
DB_USER = your_db_username
DB_PASSWORD = your_db_password

#JWT
JWT_SECRET = any_secret
JWT_EXPIRES_IN = 15d
```

4. Run the app
```bash
npm run start
```

## Contributing

Contributions are welcome! If you have any ideas for improving the app or want to report a bug, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details