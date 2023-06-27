# APOD
An API and front end to fetch + render a random Astronomy Picture of the Day

# Overview
NASA provides a number of free APIs (https://api.nasa.gov/). This project is an implementation of the Astronomy Picture of the Day (APOD) API. One of the ways you can call the API is to ask for a random picture. 

# How to Use
It's relatively straight forward to use. To get started, get yourself an API key here https://api.nasa.gov/. Place it in config.js. Place all files in the same directory and then browse to index.html. Upon page load of index.html, index.js fetches the APOD request URL. It then parses the response into a JSON. We check the response type to ensure that it is an "image", as there are other media types which the API does not currently support. If it is not an image, we run another fetch.

We parse the JSON response to pull out:
  - Image date
  - URL
  - HQ URL
  - Explanation

Those pieces are then formatted into an HTML string and rendered into the responseHolder element. There's also a button that will trigger a fetch upon user click. 

# NOTE
This API seems to hang on {pending} for a while (sometimes indefinitely). It's not unexpected to see long fetch times. The retry button will just make another call, it doesn't kill the pending call. I still need to learn how to kill pending calls :)

There are also some nascent methods relating to other NASA APIs in index.js. They don't do anything noteworthy as yet, but feel free to take a look.
