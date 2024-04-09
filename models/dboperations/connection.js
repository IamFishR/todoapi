class Connection {
    constructor(connection, logme) {
        this.connection = connection;
        this.logme = logme;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    this.logme.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    this.logme.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Connection;