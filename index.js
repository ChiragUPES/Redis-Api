const express = require("express");

const fetch = require("node-fetch");

const redis = require("redis");
const app = express();

//Declare express server port and redis client port

const PORT = process.env.PORT || 3000;

const REDIS_PORT = process.env.REDIS_PORT || 6379;

app.listen(PORT, () => {

  console.log(`App listening on port ${PORT}...`);

});



const redisClient = redis.createClient(REDIS_PORT);

//Create an app const by excecuting express like a function


app.get("/search/:username", cache, getPublicReposNumber);

async function getPublicReposNumber(req, res, next) {

  try {

    console.log("Fetching data...");

    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    //set to redis

    redisClient.setex(username, 3000, data);

    res.status(200).send(setResponse(username, data));

  } catch (error) {

    console.error(error);

    req.status(500).json({ error: error });

  }

}


async function getPublicReposNumber(req, res, next) {
  try {
    console.log("Fetching data...");
	const { username } = req.params;
const response = await axios.get(`https://api.github.com/users/${username}`);
const data =response.data;
    //set to redis
redisClient.setex(username, 3000, JSON.stringify(data));
//    res.status(200).send(setResponse(username, data));
	return res.json(data);  
} catch (error) {
console.error(error);
    return res.status(500).json(error);
  }
}










function cache(req, res, next) {

  const { username } = req.params;

  redisClient.get(username, (error, cachedData) => {

    if (error) throw error;

    if (cachedData != null) {

      res.send(cachedData);

    } else {

      next();

    }

  });

}

function setResponse(username, repos) {
return `<h2>${username} has ${repos} Github repos</h2>`;
//return '<h2>Welcome</h2>';
}






























