export const itineraryData = [
  {
    id: 0,
    destination: "Auckland",
    location: "Auckland, New Zealand",
    coordinates: [-36.8509, 174.7645],
    dates: "Mar 3",
    nights: 0,
    phase: "departure",
    travellingWith: "Friends + Kids",
    weather: { temp: "22°C", condition: "Sunny", icon: "sun", humidity: "65%" },
    timezone: { name: "NZDT", offset: "+13", nzDiff: "Home" },
    photo: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=250&fit=crop",
    highlights: [
      "Departure day!",
      "FJ 410: AKL 3:00pm → Nadi 5:00pm",
      "Pack light - you'll want room for souvenirs",
      "Check in 2hrs before flight"
    ],
    activities: [
      { day: "Tue Mar 3", activity: "FJ 410: AKL 3:00pm → NAN 5:00pm", type: "travel" }
    ],
    workSpaces: [],
    workSchedule: { type: "travel", days: ["Travel"] },
    color: "#673ab7",
    icon: "plane"
  },
  {
    id: 1,
    destination: "Fiji",
    location: "Nadi, Fiji",
    coordinates: [-17.7765, 177.4356],
    dates: "Mar 3-6",
    nights: 3,
    phase: "stopover",
    travellingWith: "Friends + Kids",
    weather: { temp: "28°C", condition: "Sunny", icon: "sun", humidity: "75%" },
    timezone: { name: "FJT", offset: "+12", nzDiff: "Same as NZ" },
    photo: "https://images.unsplash.com/photo-1589179899295-f2a3c5e90f47?w=400&h=250&fit=crop",
    highlights: [
      "Beach & pool relaxation with friends",
      "Same timezone as NZ",
      "Kids pool time!",
      "Late night flight to Tokyo (11:55pm Mar 6)"
    ],
    activities: [
      { day: "Tue Mar 3", activity: "Arrive 5:00pm from Auckland. Transfer to resort", type: "travel" },
      { day: "Wed Mar 4", activity: "Beach & pool day with kids 🏊", type: "off" },
      { day: "Thu Mar 5", activity: "Relaxation day, evening dinner together", type: "off" },
      { day: "Fri Mar 6", activity: "Full day free, late checkout. FJ 351: NAN 11:55pm → Tokyo", type: "travel" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off", "Off", "Travel"] },
    color: "#00bcd4",
    icon: "palm"
  },
  {
    id: 2,
    destination: "Tokyo Day 1",
    location: "Kichijoji, Tokyo",
    coordinates: [35.7031, 139.5795],
    dates: "Mar 7",
    nights: 1,
    phase: "tokyo",
    travellingWith: "Friends + Kids",
    weather: { temp: "12°C", condition: "Partly Cloudy", icon: "cloud-sun", humidity: "55%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
    highlights: [
      "FJ 351 arrives 6:15am - adjust to timezone",
      "Check in to Airbnb",
      "Chill morning, let kids nap",
      "Inokashira boat house - giant swan boats! 🦢"
    ],
    activities: [
      { day: "Sat Mar 7 - Morning", activity: "FJ 351 arrives NRT 6:15am. Train to Kichijoji Airbnb ✈️", type: "travel" },
      { day: "Sat Mar 7 - Midday", activity: "Chill, explore area around Airbnb. Give kids a nap 💤", type: "off" },
      { day: "Sat Mar 7 - Afternoon", activity: "Inokashira boat house - rent giant swan boats, cherry blossoms 🌸 (16 min walk)", type: "activity" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#e91e63",
    icon: "tower"
  },
  {
    id: 3,
    destination: "Tokyo Day 2",
    location: "Shibuya & Shinjuku",
    coordinates: [35.6595, 139.7004],
    dates: "Mar 8",
    nights: 1,
    phase: "tokyo",
    travellingWith: "Friends + Kids",
    weather: { temp: "13°C", condition: "Clear", icon: "sun", humidity: "50%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=250&fit=crop",
    highlights: [
      "Explore Shibuya and Shinjuku",
      "Tokyo Metropolitan Government Building (morning views!)",
      "Boys hang while girls take kids 👫",
      "Famous Shibuya crossing"
    ],
    activities: [
      { day: "Sun Mar 8 - Morning", activity: "Tokyo Metropolitan Government Building - free observation deck 🌆 (go in morning)", type: "activity" },
      { day: "Sun Mar 8 - Afternoon", activity: "Boys go hang while girls take the kids for a few hours 👨‍👦👩‍👧", type: "off" },
      { day: "Sun Mar 8 - Evening", activity: "Explore Shibuya & Shinjuku, famous crossing, dinner", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#e91e63",
    icon: "tower"
  },
  {
    id: 4,
    destination: "Tokyo Day 3",
    location: "Art Aquarium & Akihabara",
    coordinates: [35.7022, 139.7745],
    dates: "Mar 9",
    nights: 1,
    phase: "tokyo",
    travellingWith: "Friends + Kids",
    weather: { temp: "14°C", condition: "Sunny", icon: "sun", humidity: "45%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    highlights: [
      "Art Aquarium - stunning fish displays 🐠",
      "Boys take kids to Electric Town (Akihabara)",
      "Girls get kid-free afternoon! 💅",
      "Anime, games, and gadgets galore"
    ],
    activities: [
      { day: "Mon Mar 9 - Morning", activity: "Art Aquarium - beautiful illuminated fish exhibits 🐠", type: "activity" },
      { day: "Mon Mar 9 - Afternoon", activity: "Boys go to Electric Town (Akihabara) with kids - anime, games, gadgets 🎮", type: "activity" },
      { day: "Mon Mar 9 - Afternoon", activity: "Girls treat ourselves to a kid-free afternoon! 💆‍♀️", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#e91e63",
    icon: "tower"
  },
  {
    id: 5,
    destination: "Tokyo Day 4",
    location: "Tokyo Disneyland",
    coordinates: [35.6329, 139.8804],
    dates: "Mar 10",
    nights: 1,
    phase: "tokyo",
    travellingWith: "Friends + Kids",
    weather: { temp: "15°C", condition: "Clear", icon: "sun", humidity: "50%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?w=400&h=250&fit=crop",
    highlights: [
      "DISNEYLAND DAY! 🏰✨",
      "Arrive early for Fantasy Springs",
      "Book Premier Access NOW!",
      "Stay for fireworks 🎆"
    ],
    activities: [
      { day: "Tue Mar 10 - All Day", activity: "Tokyo Disneyland! Arrive early, Fantasy Springs, parades, stay for fireworks 🎆🏰", type: "activity" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#ff4081",
    icon: "tower"
  },
  {
    id: 6,
    destination: "Tokyo Day 5",
    location: "Travel to Kyoto",
    coordinates: [35.0116, 135.7681],
    dates: "Mar 11",
    nights: 1,
    phase: "travel",
    travellingWith: "Friends + Kids",
    weather: { temp: "14°C", condition: "Clear", icon: "sun", humidity: "50%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop",
    highlights: [
      "Checkout from Tokyo Airbnb",
      "Shinkansen to Kyoto (~2.5hrs) 🚄",
      "Check in at 4pm",
      "Optional: Nanzenji Tenjuan Temple"
    ],
    activities: [
      { day: "Wed Mar 11 - Morning", activity: "Checkout from Tokyo Airbnb", type: "travel" },
      { day: "Wed Mar 11 - Midday", activity: "Shinkansen to Kyoto (~2.5 hours) 🚄", type: "travel" },
      { day: "Wed Mar 11 - Afternoon", activity: "Check in 4pm. Optional: Nanzenji Tenjuan Temple ⛩️", type: "activity" },
      { day: "Wed Mar 11 - Evening", activity: "Explore attractions walking distance from hotel", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "travel", days: ["Travel"] },
    color: "#607d8b",
    icon: "train"
  },
  {
    id: 7,
    destination: "Kyoto Day 2",
    location: "Day Trip to Osaka",
    coordinates: [34.6937, 135.5023],
    dates: "Mar 12",
    nights: 1,
    phase: "kyoto",
    travellingWith: "Friends + Kids",
    weather: { temp: "15°C", condition: "Sunny", icon: "sun", humidity: "48%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&h=250&fit=crop",
    highlights: [
      "Day trip to Osaka! 🐙",
      "Osaka Aquarium - whale sharks!",
      "Borderless Garden (teamLab)",
      "Use Amazing Pass for attractions"
    ],
    activities: [
      { day: "Thu Mar 12 - Morning", activity: "Train to Osaka (~30 min)", type: "travel" },
      { day: "Thu Mar 12 - Midday", activity: "Osaka Aquarium Kaiyukan - whale sharks, penguins, jellyfish 🦈", type: "activity" },
      { day: "Thu Mar 12 - Afternoon", activity: "Borderless Garden (teamLab) - immersive digital art 🎨", type: "activity" },
      { day: "Thu Mar 12 - Evening", activity: "Explore Osaka using Amazing Pass, return to Kyoto", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#9c27b0",
    icon: "temple"
  },
  {
    id: 8,
    destination: "Kyoto Day 3",
    location: "Arashiyama",
    coordinates: [35.0094, 135.6669],
    dates: "Mar 13",
    nights: 1,
    phase: "kyoto",
    travellingWith: "Friends + Kids",
    weather: { temp: "14°C", condition: "Partly Cloudy", icon: "cloud-sun", humidity: "52%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=250&fit=crop",
    highlights: [
      "Arashiyama Bamboo Grove 🎋",
      "Tenryu-ji Temple - UNESCO World Heritage",
      "Kimono Forest - stunning at night",
      "All within walking distance!"
    ],
    activities: [
      { day: "Fri Mar 13 - Morning", activity: "Travel to Arashiyama (41 min from hotel)", type: "travel" },
      { day: "Fri Mar 13 - Midday", activity: "Arashiyama Bamboo Grove - iconic towering bamboo forest 🎋", type: "activity" },
      { day: "Fri Mar 13 - Afternoon", activity: "Tenryu-ji Temple - beautiful zen garden, UNESCO site ⛩️", type: "activity" },
      { day: "Fri Mar 13 - Evening", activity: "Kimono Forest - illuminated kimono fabric cylinders ✨", type: "activity" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#9c27b0",
    icon: "temple"
  },
  {
    id: 9,
    destination: "Kyoto Day 4",
    location: "Fushimi Inari & Nara",
    coordinates: [34.9671, 135.7727],
    dates: "Mar 14",
    nights: 1,
    phase: "kyoto",
    travellingWith: "Friends + Kids",
    weather: { temp: "15°C", condition: "Sunny", icon: "sun", humidity: "45%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=250&fit=crop",
    highlights: [
      "Early morning: Fushimi Inari Taisha ⛩️",
      "Beat the crowds - go at 7am!",
      "Afternoon: Nara Deer Park 🦌",
      "Feed the friendly bowing deer"
    ],
    activities: [
      { day: "Sat Mar 14 - Early AM", activity: "Fushimi Inari Taisha - thousands of torii gates ⛩️ (go at 7am!)", type: "activity" },
      { day: "Sat Mar 14 - Morning", activity: "Get food near the shrine, explore the shops", type: "off" },
      { day: "Sat Mar 14 - Afternoon", activity: "Nara Deer Park - feed the famous bowing deer! 🦌", type: "activity" },
      { day: "Sat Mar 14 - Evening", activity: "Explore Nara, return to Kyoto", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#9c27b0",
    icon: "temple"
  },
  {
    id: 10,
    destination: "Kyoto Day 5",
    location: "Travel to Hakone",
    coordinates: [35.2326, 139.1069],
    dates: "Mar 15",
    nights: 1,
    phase: "travel",
    travellingWith: "Friends + Kids",
    weather: { temp: "11°C", condition: "Misty", icon: "cloud", humidity: "70%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?w=400&h=250&fit=crop",
    highlights: [
      "Checkout 10am from Kyoto",
      "Shosei-en Garden (12 min walk from station) 🌳",
      "Train to Hakone (~3hrs)",
      "Settle into ryokan"
    ],
    activities: [
      { day: "Sun Mar 15 - Morning", activity: "Checkout 10am. Shosei-en Garden (12 min walk from Kyoto Station) 🌳", type: "activity" },
      { day: "Sun Mar 15 - Midday", activity: "Train to Hakone (~3 hours)", type: "travel" },
      { day: "Sun Mar 15 - Evening", activity: "Arrive Hakone, check in to ryokan, first onsen! ♨️", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "travel", days: ["Travel"] },
    color: "#607d8b",
    icon: "train"
  },
  {
    id: 11,
    destination: "Hakone Day 1",
    location: "Hakone, Japan",
    coordinates: [35.2326, 139.1069],
    dates: "Mar 16",
    nights: 1,
    phase: "hakone",
    travellingWith: "Friends + Kids",
    weather: { temp: "12°C", condition: "Partly Cloudy", icon: "cloud-sun", humidity: "65%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=250&fit=crop",
    highlights: [
      "Hakone Ropeway over Owakudani 🌋",
      "Lake Ashi pirate ship cruise 🏴‍☠️",
      "Kids will love the pirate ship!",
      "Volcanic black eggs"
    ],
    activities: [
      { day: "Mon Mar 16 - Morning", activity: "Hakone Ropeway over Owakudani valley - volcanic views! 🌋", type: "activity" },
      { day: "Mon Mar 16 - Afternoon", activity: "Lake Ashi pirate ship cruise - kids love it! 🏴‍☠️", type: "activity" },
      { day: "Mon Mar 16 - Evening", activity: "Onsen, kaiseki dinner, relaxation ♨️", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#ff5722",
    icon: "hotspring"
  },
  {
    id: 12,
    destination: "Hakone Day 2",
    location: "Last Day Together",
    coordinates: [35.2326, 139.1069],
    dates: "Mar 17",
    nights: 0,
    phase: "hakone",
    travellingWith: "Friends + Kids",
    weather: { temp: "13°C", condition: "Clear", icon: "sun", humidity: "55%" },
    timezone: { name: "JST", offset: "+9", nzDiff: "4hrs behind NZ" },
    photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=250&fit=crop",
    highlights: [
      "Last day of friends trip! 😢❤️",
      "Morning onsen",
      "Head back to Tokyo",
      "Amazing memories made!"
    ],
    activities: [
      { day: "Tue Mar 17 - Morning", activity: "Last morning onsen, checkout from ryokan ♨️", type: "off" },
      { day: "Tue Mar 17 - Midday", activity: "Travel back to Tokyo area", type: "travel" },
      { day: "Tue Mar 17 - Afternoon", activity: "End of friends trip! See you back in NZ! 👋❤️", type: "off" }
    ],
    workSpaces: [],
    workSchedule: { type: "off", days: ["Off"] },
    color: "#ff5722",
    icon: "hotspring"
  }
];

export const tripInfo = {
  title: "Friends Japan Trip 2026",
  dates: "March 7 - 17, 2026",
  totalDays: 11,
  destinations: 13,
  summary: "Friends Adventure with Kids!",
  phases: {
    stopover: { label: "Fiji Stopover", color: "#00bcd4" },
    tokyo: { label: "Tokyo", color: "#e91e63" },
    kyoto: { label: "Kyoto", color: "#9c27b0" },
    hakone: { label: "Hakone", color: "#ff5722" },
    travel: { label: "Travel Day", color: "#607d8b" },
    departure: { label: "Departure", color: "#607d8b" }
  },
  travelNotes: [
    "Japan is 4hrs behind NZ",
    "Book Disneyland tickets NOW!",
    "Fushimi Inari - go at 7am to beat crowds!",
    "Kids nap time = adult chill time 😴"
  ],
  workSummary: {
    callDays: 0,
    deepWorkDays: 0,
    standardWorkDays: 0,
    lightWorkDays: 0,
    daysOff: 11,
    travelDays: 4
  },
  bookNow: [
    { item: "Tokyo Disneyland tickets (Mar 10)", when: "NOW", notes: "Book Premier Access for Fantasy Springs" },
    { item: "Osaka Aquarium tickets", when: "1 week", notes: "Can get busy" },
    { item: "JR Pass (7 or 14 day)", when: "NOW", notes: "Must buy before arriving in Japan" },
    { item: "teamLab Borderless tickets", when: "NOW", notes: "Book specific time slot" }
  ],
  timeZones: [
    { japan: "7am", nz: "11am", sydney: "9am", best: "Morning start" },
    { japan: "12pm", nz: "4pm", sydney: "2pm", best: "Lunch time" },
    { japan: "6pm", nz: "10pm", sydney: "8pm", best: "Dinner time" }
  ]
};

export const routeConnections = [
  { from: 0, to: 1, transport: "FJ 410", duration: "~2 hours", icon: "plane", notes: "AKL 3:00pm → NAN 5:00pm" },
  { from: 1, to: 2, transport: "FJ 351", duration: "~9 hours", icon: "plane", notes: "NAN 11:55pm → NRT 6:15am" },
  { from: 2, to: 3, transport: "Same city", duration: "—", icon: "train", notes: "Tokyo Airbnb" },
  { from: 3, to: 4, transport: "Same city", duration: "—", icon: "train", notes: "Tokyo Airbnb" },
  { from: 4, to: 5, transport: "Same city", duration: "—", icon: "train", notes: "Tokyo Airbnb" },
  { from: 5, to: 6, transport: "Shinkansen", duration: "~2.5 hours", icon: "train-bullet", notes: "Tokyo → Kyoto" },
  { from: 6, to: 7, transport: "Day trip", duration: "~30 min", icon: "train", notes: "Kyoto → Osaka" },
  { from: 7, to: 8, transport: "Local train", duration: "~41 min", icon: "train", notes: "Kyoto → Arashiyama" },
  { from: 8, to: 9, transport: "Local", duration: "—", icon: "train", notes: "Kyoto hotel" },
  { from: 9, to: 10, transport: "Train", duration: "~3 hours", icon: "train", notes: "Kyoto → Hakone" },
  { from: 10, to: 11, transport: "Local", duration: "—", icon: "bus", notes: "Hakone ryokan" },
  { from: 11, to: 12, transport: "Train", duration: "~1.5 hours", icon: "train", notes: "Hakone → Tokyo" }
];

export const workTypes = {
  activity: { label: "Activity", color: "#4caf50", icon: "🎯" },
  off: { label: "Free Time", color: "#ff9800", icon: "🌴" },
  travel: { label: "Travel", color: "#607d8b", icon: "🚄" }
};
