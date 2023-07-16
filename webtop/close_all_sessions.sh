#!/bin/bash

# kill all webtop containers (that have the label app=webtop)
docker kill $(docker ps -q --filter "label=app=webtop")