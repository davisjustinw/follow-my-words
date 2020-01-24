# Follow Me... Follow My Words
Renga is an ancient Japanese poetic form that gave rise to Haiku.  Renga was a kind of game where each poet took turns writing a stanza.  An interesting paper on the subject can be found [here](https://www.uwosh.edu/facstaff/barnhill/244-japan/Renga.pdf) by David Landis Barnhill.  The themes of transience in the paper inspired images of words as cherry blossoms in a kind of game/relaxing pastime.

> Old words sprout, then fade.
> Renga plants an ancient seed.
> Reflect, inspire, play.

## Setup
As configured, this application requires PostgreSQL for its database.

[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

With PostgreSQL installed, clone or download the repo.

In the console, install the repo and setup the PostgreSQL user.

```
$ bundle install
$ psql
create role fmw with createdb login password '<YOUR_PASSWORD>';
\q
```

Create a .env file in the backend folder and add the following.

```
FMW_DATABASE_PASSWORD=<YOUR_PASSWORD>
```
The database config file sits in /backend/config/database.yml.

Create, migrate then seed the database. The seed text, Alice's Adventures in Wonderland, sits in /backend/lib. Fire up the rails server.  Open /frontend/index.html in a browser to play the game.

## User Stories

### As a player ...
* I see words float from the top down like leaves or blossoms, inspiring a sense of calm and inspiration
* I see a number indicating how many syllables are left.
* I see the last stanza set so I can make my verses flow.
* Clicking one of the falling words places it in the verse.
* Clicking a word makes it fall again.
   * A released word can be clicked again before it disappears from view
* Hitting space bar plays verses back

## Syllable Structure

(575 [77) {575] |77} /575| 77/

## Seed Text
* [Alice In Wonderland](http://www.gutenberg.org/ebooks/11)
