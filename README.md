## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Preparation
1. Download and install Elasticsearch (Tor Browser will help you)
    https://www.elastic.co/downloads/elasticsearch

2. Configure ElasticSearch (elasticsearch/elasticsearch.yml):
    - Disable authorization:
        <b>xpack.security.enabled: false</b>
    - Disable SSL:
        <b>xpack.security.http.ssl:</b><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;enabled: <b>false</b>
        <b>xpack.security.transport.ssl:</b><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;enabled: <b>false</b>
            
3. Download and install MySQL
    https://www.mysql.com/downloads/

4. Create mysql user "vino"
    ```sql
    CREATE USER `vino`@`localhost` IDENTIFIED BY `vino`;
    FLUSH PRIVILEGES;
    ```

5. Import MySQL dump
    ```bash
    mysql -d vinogradnevi -u vino -pvino < ./vinogradnevi.2023.08.07.sql
    ```

6. Grant all privileges to user "vino" on new database
    ```sql
    GRANT ALL PRIVILEGES ON `vinogradnevi`.* TO `vino`@`localhost`;
    ```

7. Create .env file
```env
# Main application settings
PORT=4000
BASE_PATH=
API_PREFIX=/api

# MySQL settings
DBHOST=localhost
DBUSERNAME=vino
DBPASSWORD=vino
DBDATABASE=vinogradnevi

# Elastic settings
ELASTICURL=http://localhost:9200
```

## Installation
 
```bash
$ yarn install
$ yarn run migration up
$ yarn run export-catalog-to-elastic
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Add new migration

```bash
$ yarn run new-migration
```

## Additional section
