# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make the scripts executable
RUN chmod +x /app/migrate.sh /app/entrypoint.sh

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run entrypoint.sh when the container launches
ENTRYPOINT ["./entrypoint.sh"]
