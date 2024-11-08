
---

# Price Tracker API

This project is a **NestJS-based API** for tracking cryptocurrency prices and sending email alerts if a chain's price increases by more than 3% within an hour. The API includes features for setting price alerts and monitoring price changes over time.

## Features

- **Create Price Alerts:** Set up alerts for specific cryptocurrencies, specifying a target price and an email to notify when the target price is reached.
- **Email Notifications:** Automatically send an email notification when a price alert is triggered.
- **Scheduled Price Monitoring:** Monitor cryptocurrency prices at regular intervals and send alerts when certain thresholds are met.
- **API Documentation:** View and test API endpoints via Swagger at `/api-docs`.

## Prerequisites

- **Docker** and **Docker Compose** installed on your system.

## Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/price-tracker.git
cd price-tracker
```

## Environment Variables

Create an `.env` file in the root of the project with the following variables:

```plaintext
# Database connection
DATABASE_URL=postgresql://admin:admin@db:5432/price_tracker_db

# API Key for Moralis
MORALIS_API_KEY=your_moralis_api_key

# SMTP email configuration
SMTP_SERVER=smtp.gmail.com
EMAIL=your_email@gmail.com
PASSWORD=your_app_specific_password

# PostgreSQL settings
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=price_tracker_db

# Crypto addresses
WETH=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
WMATIC=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

# Alert email recipient
ALERT_EMAIL=alert_recipient_email@example.com
```

## Example `.env` Template

You may use this example to get started with your `.env` file setup:

```plaintext
DATABASE_URL=
MORALIS_API_KEY=
SMTP_SERVER=
EMAIL=
PASSWORD=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
WETH=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
WMATIC=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
ALERT_EMAIL=alert_recipient_email@example.com
```

## Application Structure

- **`PriceService`**: Manages fetching token prices from Moralis and saving them to the database.
- **`SchedulerService`**: Runs scheduled tasks to check prices periodically. If there's a significant price increase (3% within an hour), it triggers an email alert.
- **`AlertsService`**: Manages user alerts for specific target prices, notifying users via email when their alert is triggered.

### API Endpoints

The following are the primary functions of the project:

- **Fetch Latest Price**: Automatically fetches the latest price every 5 minutes.
- **Save Price to Database**: Saves hourly prices for WETH and WMATIC to PostgreSQL.
- **Send Alert**: Sends an alert email if the price threshold is met or if a target price alert is triggered.

### Sending Email Alerts

Alerts are sent via email based on the following conditions:

- If the price of a token (ETH or MATIC) increases by 3% within an hour.
- If a user has set an alert for a target price, and the token reaches or exceeds that target.

Ensure that the email credentials in your `.env` file are valid and that [app-specific passwords](https://support.google.com/accounts/answer/185833?hl=en) are used if you are using Gmail.

### Build and Run the Docker Containers

Run the following command to build and start the application and its database in Docker:

```bash
docker-compose up --build
```

This command will start the API service and a PostgreSQL database instance, and the NestJS application will be available at `http://localhost:3000`.

  > **Note:** The `docker-compose.yml` file should include the database and app service configurations, with both services using the same network for easy communication.

### Access the API Documentation

Once the Docker containers are up, you can access the **Swagger API Documentation** at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Troubleshooting

- Ensure Docker and Docker Compose are installed correctly.
- If you encounter database connection issues, verify that the database configuration in `.env` matches your `docker-compose.yml` settings.
- Check the logs of the Docker containers for detailed error messages:

  ```bash
  docker-compose logs
  ```



