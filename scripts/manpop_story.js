///////////// VARS ///////////////
var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content p");

// STORIES //
var stories = [

  { title: "The Story of Manhattan's Dynamic Population",
    description: "The visualization you see here is a model of the dynamic population of Manhattan, block-by-block and hour-by-hour for a typical week in late Spring.  The model is currently fixed to your local time.  The population estimates are the result of a combination of US Census data and a geographic dispersion of calculated net inflows and outflows from subway stations, normalized to match population daytime and nighttime estimates provided by a study from NYU Wagner.  You may exit the story at any time by selecting the ‘Visualization’ or ‘Statistics’ tabs in the header above.  For more information, click ‘About’.  To continue, click the arrows below.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: currentDay,
    time: currentHour,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "An Island of (Population) Extremes",
    description: "While Manhattan is well-known for its concentration of culture, art, and economic sectors, the crown county of NYC is also unique for its concentration of people in a statistical sense.  In addition to being the most-dense county in the US, Manhattan also lays claim to having the highest ratio of daytime-to-nighttime population anywhere in the country at nearly 2 to 1.  While the 2010 US Census claims that 1.6 million reside in Manhattan, a study by NYU Wagner estimates the true overnight population is likely around 2 million people, and that this figure balloons to nearly 4 million people during the workday.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: currentDay,
    time: currentHour,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "“The City That Never Sleeps”...",
    description: "Though the US Census Bureau estimates that 1.6 million people live in Manhattan, a study by NYU Wagner defers to the old adage in providing an actual overnight population of about 2 million people.  The additional 25% represent an ever-present mix of workers and visitors.  Subway activity suggests that this lower bound is likely approached overnight on Sunday around 2 am, just before the workweek begins.  This “trough” of population is visualized here.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: 0,
    time: 2,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "...or, “The Center of The Universe”?",
    description: "At the other extreme, we have Manhattan at its fullest, liveliest hour- occurring sometime after lunch (about 2 pm) on Wednesdays.  The NYU Wagner study provides an upper bound of about 4 million people, which is consistent with a 2x increase compared to the overnight population.  The peak population level tapers on either side of Wednesday, with Fridays exhibiting the lowest peak population levels of the workweek.   Manhattan is seen here at its highest estimated population peak.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: 2,
    time: 14,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "The Uptown/Downtown Divide",
    description: "Although Manhattan’s population as a whole swings considerably throughout the workweek, the Island can be split into uptown and downtown simply by separating neighborhoods that are daytime importers from neighborhoods that are daytime exporters.  Collectively, the island north of Central Park behaves much like the outer boroughs in that it is a daytime exporter, with an estimated decrease in population of about 20%.  Conversely, the island below Central Park is a daytime importer, increasing its total population by over 3x against overnight estimates.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: 2,
    time: 14,
    flyTo: {
      zoom: 11,
      center: [-73.991026, 40.775759],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.5,
      center: [-73.96, 40.71],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    }
  },

  { title: "The Uptown/Downtown Divide",
    description: "Shown here are all neighborhoods north of 59th Street.  At “peak Manhattan population” (Wednesdays around 2 pm), this region holds an estimated 1.25 million people and constitutes over half of the land area of Manhattan (about 12 square miles, not including Central Park).  The density of about 100,000 persons per square mile (~40,000 persons per square kilometer) at this time is on par with that of the densest residential areas of Paris (11th arrondissement) and Taipei (Yonghe District).",
    districts: [107,108,109,110,111,112],
    day: 2,
    time: 14,
    flyTo: {
      zoom: 11,
      center: [-73.991026, 40.775759],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.5,
      center: [-73.96, 40.71],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    }
  },

  { title: "The Uptown/Downtown Divide",
    description: "Shown below are all districts south of 59th Street.  At peak Manhattan population, this region contains over twice as many people as its uptown counterpart (about 2.7 million people) in an area less than half the total land area of Manhattan (9.5 square miles).  The estimated density of about 280,000 persons per square mile (110,000 persons per square kilometer) is over two and a half times denser than northern Manhattan neighborhoods, and is on par with the densest regions of Mumbai (Zaveri Bazar) and Macau (St. Anthoy Parish).  This routinely makes downtown Manhattan one of the densest places on Earth.",
    districts: [101,102,103,104,105,106],
    day: 2,
    time: 14,
    flyTo: {
      zoom: 11,
      center: [-73.991026, 40.775759],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.5,
      center: [-73.96, 40.71],
      bearing: -15,
      pitch: 48,
      speed: 0.3
    }
  },

  { title: "Midtown & FiDi: Population Magnets",
    description: "Among all downtown neighborhoods, the two with the greatest impact on the workday net population increase are colloquially known as the Financial District (“FiDi”) and Midtown.  Shown here at peak Manhattan population are Community Boards 1 and 5, encompassing the rough boundaries of FiDi and the traditional “Midtown”, respectively.  At their peaks, FiDi and Midtown increase their daytime populations by factors of about 4x (+250,000 people) and 10x (+680,000 people), respectively.",
    districts: [101,105],
    day: 2,
    time: 14,
    flyTo: {
      zoom: 11.75,
      center: [-74.01, 40.755],
      bearing: -12.0,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 11.0,
      center: [-73.99, 40.72],
      bearing: -12.0,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Midtown & FiDi: Population Magnets",
    description: "The large multiplicative increases in the daytime versus the overnight populations for FiDi and Midtown are a consequence of the low residential counts for both of these neighborhoods.  Shown below are Community Districts 1 and 5 at their lowest estimated populations.  While Midtown and FiDi may collectively host nearly a million people every workday, these neighborhoods are actually home to less than 80,000 residents.",
    districts: [101,105],
    day: 0,
    time: 2,
    flyTo: {
      zoom: 11.75,
      center: [-74.01, 40.755],
      bearing: -12.0,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 11.0,
      center: [-73.99, 40.72],
      bearing: -12.0,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Manhattan Takes a Breather",
    description: "While Manhattan may never sleep, it actually does take a break on the weekends.  Saturday sees a fraction of the workweek’s peak population (about 2.6 million people) peak at about 2 pm, while Sunday sees even less people (about 2.5 million) peak at about 3 pm.  The minimum overnight populations for Friday and Saturday (prime nightlife hours) are slightly elevated over those of the workweek.  Shown here is the peak Saturday population.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: 5,
    time: 15,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Bucking the Trend: Morningside Heights",
    description: "There are few exceptions to the prevailing uptown/downtown migration pattern.  The largest exception is the neighborhood of Morningside Heights on the south side of West Harlem.  Morningside Heights is both geographically and demographically dominated by Columbia University, including its Morningside campus, its various real estate holdings, and its nearly 40,000 students.  Seen here is the West Harlem district just prior to the workday on a Monday.",
    districts: [109],
    day: 0,
    time: 5,
    flyTo: {
      zoom: 12.45,
      center: [-73.943367, 40.824496],
      bearing: 91.31,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 12.25,
      center: [-73.96, 40.817],
      bearing: 91.31,
      pitch: 60.0,
      speed: 0.3
    }
  },  

  { title: "Bucking the Trend: Morningside Heights",
    description: "During peak Manhattan population hours when uptown is exporting its residents, Morningside Heights is actually estimated to increase its population by about 10,000 people.  The increase in population immediately surrounding the Columbia University area during the afternoon stands in contrast to the decreases seen in the northern half of the West Harlem district on a Monday afternoon below.",
    districts: [109],
    day: 0,
    time: 14,
    flyTo: {
      zoom: 12.45,
      center: [-73.943367, 40.824496],
      bearing: 91.31,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 12.25,
      center: [-73.96, 40.817],
      bearing: 91.31,
      pitch: 60.0,
      speed: 0.3
    }
  }, 

  { title: "Bucking the Trend: Lower East Side",
    description: "At the other end of Manhattan, where the prevailing daytime population dynamic is the mass importation of workers, the Lower East Side (“LES”) stands out as exhibiting a neutral dynamic, suggesting that people leave and enter the neighborhood at the same rate.  Nearly all the land area in LES is zoned residential.  Seen here is Community District 3, encompassing LES, in addition to Alphabet City, Chinatown and the outskirts of SoHo, just before the start of a workday.",
    districts: [103],
    day: 0,
    time: 6,
    flyTo: {
      zoom: 12.5,
      center: [-73.99, 40.727423],
      bearing: -20.47,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 12.0,
      center: [-73.985, 40.715],
      bearing: -20.47,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Bucking the Trend: Lower East Side",
    description: "In the middle of a workday, shown below, the western reaches of Community District 3 exhibit daytime importation while the population of LES in the east remains more-or-less constant.  The western zone of Community District 3 contains commercially-zoned portions of Chinatown and SoHo.",
    districts: [103],
    day: 0,
    time: 14,
    flyTo: {
      zoom: 12.5,
      center: [-73.99, 40.727423],
      bearing: -20.47,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 12.0,
      center: [-73.985, 40.715],
      bearing: -20.47,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "After the Story...",
    description: "You’ve reached the conclusion of the Manhattan Population Explorer Story, but the data and visualization do not end here.  You may navigate the visualization in free-form by clicking the ‘Visualization’ tab above.  You may pan by dragging the map, or change the camera bearing and pitch by holding the Shift-key while using the arrow keys.  If you want to access the numbers used to build the visualization, you can explore the data aggregated at the neighborhood level by clicking the ‘Statistics’ tab.  For more information, click ‘About’.  To start the story from the beginning, click ‘Story‘.",
    districts: [101,102,103,104,105,106,107,108,109,110,111,112],
    day: 0,
    time: 0,
    flyTo: {
      zoom: 11.75,
      center: [-73.99, 40.755],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    },
    flyToMobile: {
      zoom: 10.75,
      center: [-73.98, 40.70],
      bearing: -2.35,
      pitch: 60.0,
      speed: 0.3
    }
  }
];

///////////// FUNCTIONS ///////////////

// Update Districts.
function updateStoryDistricts(districts) {

  // Update the sidebar filter.
  d3.select("#cb1").property("checked", (districts.indexOf(101) > -1) ? true : false);
  d3.select("#cb2").property("checked", (districts.indexOf(102) > -1) ? true : false);
  d3.select("#cb3").property("checked", (districts.indexOf(103) > -1) ? true : false);
  d3.select("#cb4").property("checked", (districts.indexOf(104) > -1) ? true : false);
  d3.select("#cb5").property("checked", (districts.indexOf(105) > -1) ? true : false);
  d3.select("#cb6").property("checked", (districts.indexOf(106) > -1) ? true : false);
  d3.select("#cb7").property("checked", (districts.indexOf(107) > -1) ? true : false);
  d3.select("#cb8").property("checked", (districts.indexOf(108) > -1) ? true : false);
  d3.select("#cb9").property("checked", (districts.indexOf(109) > -1) ? true : false);
  d3.select("#cb10").property("checked", (districts.indexOf(110) > -1) ? true : false);
  d3.select("#cb11").property("checked", (districts.indexOf(111) > -1) ? true : false);
  d3.select("#cb12").property("checked", (districts.indexOf(112) > -1) ? true : false);

  // Update the map.
  if (map)
    map.setFilter('viz', ['in', 'cd'].concat(districts));
};

// Update Daytime.
function updateStoryDaytime(day, time){

  var daytime = (day*24 + time).toString();

  // Update the slider.
  slideTimeCallback(d3.event, time);
  slideendTimeCallback(d3.event, time);
  sliderTime.value(time);

  slideDayCallback(d3.event, day);
  slideendDayCallback(d3.event, day);
  sliderDay.value(day);


  // Update the map.
  if(map) {

    map.setPaintProperty("viz",
                         "fill-extrusion-height",
                         ["*", ["get", daytime], 5]);

    map.setPaintProperty("viz",
                          "fill-extrusion-color",
                          {"base": 1,
                           "type": "interval",
                           "property": daytime,
                           "default": "#800026",
                           "stops": [[0, "#fff7ec"],
                                     [10, "#fdd49e"],
                                     [20, "#fee8c8"],
                                     [40, "#fdbb84"],
                                     [80, "#fc8d59"],
                                     [160, "#ef6548"],
                                     [320, "#d7301f"],
                                     [640, "#b30000"],
                                     [1280, "#7f0000"]]});
  };
};

// Update Story.
function updateStory(storyObj) {
  
  // Story vars.
  var title = storyObj['title'];
  var description = storyObj['description'];
  var districts = storyObj['districts'];
  var day = storyObj['day'];
  var time = storyObj['time'];
  if (media == "full")
    var cameraSettings = storyObj['flyTo'];
  else
    var cameraSettings = storyObj['flyToMobile'];

  // Update the Storymode content.
  storyHeader.text(title);
  storyContent.text(description);

  // Update the District filters.
  updateStoryDistricts(districts);

  // Update the daytime.
  updateStoryDaytime(day, time);

  // Update Camera.
  map.flyTo(cameraSettings);
};


///////////// CALLBACKS ///////////////

// Story mode click through FORWARD.
backButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum - 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});

// Story mode click through BACKWARD.
forwardButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum + 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});

