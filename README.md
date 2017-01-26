# World Food Facts

This is a project to analyze [the Open Food Facts database](https://world.openfoodfacts.org/data) and visualize the results.

## Introduction

How many people travel abroad each year? According to one research study, over 3 million people board airplanes daily to other countries, and states all around the world. People go abroad either for business travelling or tourism. For tourism travelling, one of the joys is eating the food of a foreign country. Not only can it be an intense gastronomic experience, but food is also an insight into the culture of a nation. At the same time though, eating foreign food can often be a difficult experience, and sometimes, can leave you with a rather upset stomach. This always happens to those who have to stay abroad for a while, like working or studying in a foreign country. If you're only visiting a country for a short time, chances are that you'll eat all the local food you can in a few days, or only stick to international fast food. Americans often tend to do the latter, unfortunately. However, if it is a long period of time, then you may have no choice but to adapt to the food of that country.
The motivation of our project is to helping people solve this real problem which is highly frequently encountered by almost every traveller in their daily life. That is, using modern data analysis techniques to help people understand their eating habits in their mother country, and do a recommendation of food list in their target living country so that they could adapt to the new environment more quickly and maintain a better quality of life for studying and working. All you have to do is to as a user on our website, click some buttons, and a list of food would be provided to you. Then your stomach would be happy when you choose those food our website recommend for you.

## Running on your own computer

The final dataset is about 157MB. We cannot provide the CSV file on this git repo since it is more than 100MB limit. But you can still run on limited functionality mode.

To run the server you need the following dependencies:
- Python 3.5 with the following components:
    - Pandas 0.19.2
    - Flask 0.12
    - scipy 0.18.1
    - pymongo 3.4.0

For command line runs:
<pre>
$ git clone https://github.com/suyinlong/vis.world-food-facts.git wff.git
$ cd wff.git
$ cd main
$ python main.py
</pre>

After the server is up, you can visit http://127.0.0.1:61173/

## Features

![World Map](/misc/feature.worldmap.png)

![Country Information](/misc/feature.country.info.png)

![Country Compare](/misc/feature.country.compare.png)

![Country Link](/misc/feature.country.link)

![Food Browse](/misc/feature.food.browse)

![Food Recommendation](/misc/feature.food.recommend.png)

## Demo Videos

- <https://youtu.be/i_RJ_XdzLpk>
- <https://youtu.be/ZRz1X7x5Npw>
