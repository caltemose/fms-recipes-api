# fms-recipes-api

This repo contains source for the recipe management system.

## Tech

This project is build using NodeJS and MongoDB. It contains both the API code (built on Express/Mongoose) as well as a front-end for viewing and managing recipe data.

## Data

Data dumped from MongoDB lives in `/backup` where there is also a script to export the data into this folder. The script contains instructions for restoring the data which could also be used to start a copy of this repository without having to enter new data.

## Online

The data exported from this project is consumed by a separate project at [https://github.com/caltemose/recipes](https://github.com/caltemose/recipes). The final results of that project can be viewed at [https://caltemose.github.io/recipes](https://caltemose.github.io/recipes).
