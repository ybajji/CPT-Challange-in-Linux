#!/bin/bash

#echo "Executing create_session.sh"

# Validate session ID argument
if [ -z "$1" ]; then
  #"Error: No session ID provided."
  exit 1
fi

# Get the session ID from arguments
session_id="$1"
PORT=$(shuf -i 8800-8999 -n 1)

# CREATE THE SESSION DIRECTORY
SESSION_DIR="/learn-linux/sessions/$session_id"
mkdir -p "$SESSION_DIR"

# CREATE THE SESSION
container_id=$(docker run --privileged -d \
  --name "$session_id" \
  -p "$PORT:3000" \
  --label app=webtop \
  lscr.io/linuxserver/webtop:latest)

# Block until the session is running
while [ "$(docker inspect -f '{{.State.Running}}' "$session_id")" != "true" ]; do
  sleep 1
done

# COPY THE President_of_UR FOLDER TO THE CONTAINER
docker cp President_of_UR "$container_id:/home"

# RETURN THE SESSION ID AND PORT
echo "$session_id $PORT"
