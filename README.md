# fms-recipes-api

This repo contains source for the recipe management system.

## Tech

This project is build using NodeJS and MongoDB. It contains both the API code (built on Express/Mongoose) as well as a front-end for viewing and managing recipe data.

### Environments

`npm start` fires up the dev server with NODE_ENV=dev which causes the API to use the development database.

`npm start-live` fires up the dev server with NODE_ENV=prod which causes the API to use the production database.

`/utils/` and `/backup/` always use the development database as the production database is essentially just a backup.

### Data

Data dumped from MongoDB lives in `/backup` where there is also a script to export the data into this folder. The script contains instructions for restoring the data which could also be used to start a copy of this repository without having to enter new data.

## Online

The data exported from this project is consumed by a separate project here: [https://github.com/caltemose/recipes](https://github.com/caltemose/recipes). The final results of that project can be viewed here: [https://caltemose.github.io/recipes](https://caltemose.github.io/recipes).

Because the export utilities in `/utils/` use the development database (currently), the separate front-end project consumes the development database data.

## Ideas/Notes

- `support` tag used to filter out recipes like seasonings, broth, et. al., that aren't meals, sides or desserts
- `in-fashion` tag for dashboard/recipes used the most right now or 
- season tags to show what's used most now
- dashboard for primary/common daily view
- recipe form finesse (autofocus new ingredient row, new step)

## Recipes to Consider Adding

- Ricotta pie
- Kale Salad with Feta + Chickpeas
- Thai coconut soup
- Shrimp 'n' Grits
- Eggplant Involtini
- Simple Rice Salad


