const PUZZLES = [
    {
        id: 1,
        title: "Puzzle 001",
        difficulty: "easy",
        groups: [
            { connection: "BRITISH INVASION BANDS", cards: ["The Kinks", "The Hollies", "The Animals", "The Zombies"] },
            { connection: "VELVET UNDERGROUND", cards: ["Lou Reed", "John Cale", "Moe Tucker", "Sterling Morrison"] },
            { connection: "BOWIE PERSONAS", cards: ["Ziggy Stardust", "Aladdin Sane", "Thin White Duke", "Major Tom"] },
            { connection: "WOODSTOCK PERFORMERS", cards: ["Janis Joplin", "Jimi Hendrix", "Joe Cocker", "Richie Havens"] }
        ]
    },
    {
        id: 2,
        title: "Puzzle 002",
        difficulty: "easy",
        groups: [
            { connection: "FLEETWOOD MAC MEMBERS", cards: ["Stevie Nicks", "Lindsey Buckingham", "Christine McVie", "Mick Fleetwood"] },
            { connection: "ROXY MUSIC MEMBERS", cards: ["Bryan Ferry", "Brian Eno", "Phil Manzanera", "Andy Mackay"] },
            { connection: "BEATLES ALBUMS", cards: ["Revolver", "Rubber Soul", "Abbey Road", "Let It Be"] },
            { connection: "ROLLING STONES SONGS", cards: ["Angie", "Satisfaction", "Wild Horses", "Paint It Black"] }
        ]
    },
    {
        id: 3,
        title: "Puzzle 003",
        difficulty: "medium",
        groups: [
            { connection: "SONGS WITH DAYS OF THE WEEK", cards: ["Friday I'm in Love", "Monday Monday", "Ruby Tuesday", "Sunday Bloody Sunday"] },
            { connection: "TALKING HEADS", cards: ["David Byrne", "Tina Weymouth", "Chris Frantz", "Jerry Harrison"] },
            { connection: "LED ZEPPELIN MEMBERS", cards: ["Robert Plant", "Jimmy Page", "John Paul Jones", "John Bonham"] },
            { connection: "RAMONES", cards: ["Joey", "Johnny", "Dee Dee", "Tommy"] }
        ]
    },
    {
        id: 4,
        title: "Puzzle 004",
        difficulty: "medium",
        groups: [
            { connection: "TALKING HEADS MEMBERS", cards: ["David Byrne", "Tina Weymouth", "Chris Frantz", "Jerry Harrison"] },
            { connection: "DAVID BOWIE ALBUMS", cards: ["Low", "Heroes", "Lodger", "Scary Monsters"] },
            { connection: "WOODSTOCK PERFORMERS", cards: ["Jimi Hendrix", "Janis Joplin", "Joe Cocker", "Richie Havens"] },
            { connection: "SONGS WITH WOMEN'S NAMES", cards: ["Roxanne", "Lola", "Gloria", "Layla"] }
        ]
    },
    {
        id: 5,
        title: "Puzzle 005",
        difficulty: "easy",
        groups: [
            { connection: "RUSH ALBUMS", cards: ["2112", "Hemispheres", "Permanent Waves", "Moving Pictures"] },
            { connection: "GENESIS ALBUMS", cards: ["Foxtrot", "Selling England by the Pound", "The Lamb Lies Down on Broadway", "A Trick of the Tail"] },
            { connection: "FAMOUS LIVE ALBUMS", cards: ["Frampton Comes Alive!", "Live at Leeds", "At Folsom Prison", "Cheap Trick at Budokan"] },
            { connection: "THREE-LETTER BAND NAMES", cards: ["Yes", "Can", "XTC", "ABC"] }
        ]
    },
    {
        id: 6,
        title: "Puzzle 006",
        difficulty: "easy",
        groups: [
            { connection: "THE WHO SONGS", cards: ["My Generation", "Pinball Wizard", "Baba O'Riley", "Behind Blue Eyes"] },
            { connection: "FLEETWOOD MAC ALBUMS", cards: ["Rumours", "Tusk", "Mirage", "Tango in the Night"] },
            { connection: "FAMOUS DRUMMERS", cards: ["Keith Moon", "John Bonham", "Ringo Starr", "Charlie Watts"] },
            { connection: "SONGS WITH COLORS IN THE TITLE", cards: ["Purple Haze", "White Rabbit", "Paint It Black", "Blue Monday"] }
        ]
    },
    {
        id: 7,
        title: "Puzzle 007",
        difficulty: "easy",
        groups: [
            { connection: "PINK FLOYD ALBUMS", cards: ["The Wall", "Wish You Were Here", "Animals", "Meddle"] },
            { connection: "SONGS WITH CITIES IN THE TITLE", cards: ["London Calling", "Viva Las Vegas", "Philadelphia Freedom", "New York, New York"] },
            { connection: "FAMOUS MUSIC SIBLINGS", cards: ["Noel Gallagher", "Liam Gallagher", "Ray Davies", "Dave Davies"] },
            { connection: "ARTISTS WHO CHANGED THEIR NAME", cards: ["David Bowie", "Elton John", "Freddie Mercury", "Cat Stevens"] }
        ]
    },
    {
        id: 8,
        title: "Puzzle 008",
        difficulty: "easy",
        groups: [
            { connection: "LED ZEPPELIN SONGS", cards: ["Kashmir", "Black Dog", "Immigrant Song", "Rock and Roll"] },
            { connection: "BEATLES SOLO CAREERS", cards: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"] },
            { connection: "CLASSIC DOUBLE ALBUMS", cards: ["The White Album", "Exile on Main St.", "Electric Ladyland", "Physical Graffiti"] },
            { connection: "BANDS WITH PLACE NAMES", cards: ["Boston", "Chicago", "Kansas", "Berlin"] }
        ]
    },
    {
        id: 9,
        title: "Puzzle 009",
        difficulty: "easy",
        groups: [
            { connection: "THE CARS SONGS", cards: ["Just What I Needed", "My Best Friend's Girl", "Good Times Roll", "Drive"] },
            { connection: "DEPECHE MODE ALBUMS", cards: ["Violator", "Black Celebration", "Music for the Masses", "Some Great Reward"] },
            { connection: "ARTISTS WITH ONE-WORD NAMES", cards: ["Bowie", "Prince", "Madonna", "Cher"] },
            { connection: "SONGS WITH NUMBERS IN THE TITLE", cards: ["Eight Days a Week", "One After 909", "99 Luftballons", "25 or 6 to 4"] }
        ]
    },
    {
        id: 10,
        title: "Puzzle 010",
        difficulty: "easy",
        groups: [
            { connection: "THE CURE SONGS", cards: ["Just Like Heaven", "Lovesong", "Pictures of You", "Friday I'm in Love"] },
            { connection: "DAVID BOWIE ALBUMS", cards: ["Hunky Dory", "Station to Station", "Diamond Dogs", "Young Americans"] },
            { connection: "FAMOUS COVER SONGS", cards: ["All Along the Watchtower", "Hallelujah", "Respect", "Hurt"] },
            { connection: "BANDS BEGINNING WITH THE", cards: ["The Kinks", "The Doors", "The Clash", "The Smiths"] }
        ]
    },
    {
        id: 11,
        title: "Puzzle 011",
        difficulty: "easy",
        groups: [
            { connection: "BRITISH INVASION BANDS", cards: ["The Beatles", "The Rolling Stones", "The Kinks", "The Who"] },
            { connection: "ARTISTS KNOWN BY ONE NAME", cards: ["Bowie", "Prince", "Madonna", "Cher"] },
            { connection: "SEATTLE GRUNGE BANDS", cards: ["Nirvana", "Pearl Jam", "Soundgarden", "Alice in Chains"] },
            { connection: "EARLY PUNK BANDS", cards: ["Ramones", "The Clash", "Sex Pistols", "The Damned"] }
        ]
    },
    {
        id: 12,
        title: "Puzzle 012",
        difficulty: "easy",
        groups: [
            { connection: "QUEEN SONGS", cards: ["Bohemian Rhapsody", "Somebody to Love", "Killer Queen", "We Will Rock You"] },
            { connection: "U2 ALBUMS", cards: ["War", "The Joshua Tree", "Achtung Baby", "Zooropa"] },
            { connection: "FAMOUS FRONTMEN", cards: ["Mick Jagger", "Robert Plant", "Roger Daltrey", "Freddie Mercury"] },
            { connection: "BANDS WITH ANIMAL NAMES", cards: ["The Byrds", "The Monkees", "Eagles", "Scorpions"] }
        ]
    },
    {
        id: 13,
        title: "Puzzle 013",
        difficulty: "easy",
        groups: [
            { connection: "THE POLICE SONGS", cards: ["Roxanne", "Message in a Bottle", "Every Breath You Take", "Walking on the Moon"] },
            { connection: "REM ALBUMS", cards: ["Murmur", "Reckoning", "Document", "Green"] },
            { connection: "FAMOUS BASS PLAYERS", cards: ["Paul McCartney", "John Entwistle", "Geddy Lee", "John Paul Jones"] },
            { connection: "BANDS WITH NUMBERS IN THEIR NAMES", cards: ["U2", "Blink-182", "Maroon 5", "UB40"] }
        ]
    },
    {
        id: 14,
        title: "Puzzle 014",
        difficulty: "easy",
        groups: [
            { connection: "BLONDIE SONGS", cards: ["Heart of Glass", "Call Me", "One Way or Another", "Rapture"] },
            { connection: "THE SMITHS SONGS", cards: ["This Charming Man", "How Soon Is Now?", "There Is a Light That Never Goes Out", "Panic"] },
            { connection: "FEMALE ROCK VOCALISTS", cards: ["Debbie Harry", "Patti Smith", "Chrissie Hynde", "Siouxsie Sioux"] },
            { connection: "BANDS WITH COLORS IN THEIR NAMES", cards: ["Pink Floyd", "Deep Purple", "Black Sabbath", "Simply Red"] }
        ]
    },
    {
        id: 15,
        title: "Puzzle 015",
        difficulty: "easy",
        groups: [
            { connection: "TALKING HEADS SONGS", cards: ["Psycho Killer", "Once in a Lifetime", "Burning Down the House", "Road to Nowhere"] },
            { connection: "THE CLASH SONGS", cards: ["London Calling", "Should I Stay or Should I Go", "Train in Vain", "Rock the Casbah"] },
            { connection: "FAMOUS KEYBOARD PLAYERS", cards: ["Ray Manzarek", "Rick Wakeman", "Keith Emerson", "Tony Banks"] },
            { connection: "BANDS WITH FOOD IN THEIR NAMES", cards: ["Cream", "Bread", "Hot Chocolate", "The Cranberries"] }
        ]
    },
    {
        id: 16,
        title: "Puzzle 016",
        difficulty: "easy",
        groups: [
            { connection: "THE DOORS SONGS", cards: ["Light My Fire", "People Are Strange", "Riders on the Storm", "Break on Through"] },
            { connection: "ELTON JOHN SONGS", cards: ["Rocket Man", "Tiny Dancer", "Your Song", "Bennie and the Jets"] },
            { connection: "FAMOUS GUITARISTS", cards: ["Jimi Hendrix", "Eric Clapton", "Jimmy Page", "Jeff Beck"] },
            { connection: "BANDS WITH FAMILY WORDS IN THEIR NAMES", cards: ["Sister Sledge", "The Brothers Johnson", "Twisted Sister", "Scissor Sisters"] }
        ]
    },
    {
        id: 17,
        title: "Puzzle 017",
        difficulty: "easy",
        groups: [
            { connection: "ABBA SONGS", cards: ["Dancing Queen", "Waterloo", "Mamma Mia", "Take a Chance on Me"] },
            { connection: "BRUCE SPRINGSTEEN SONGS", cards: ["Born to Run", "Thunder Road", "Dancing in the Dark", "Hungry Heart"] },
            { connection: "FAMOUS MUSIC DUOS", cards: ["Simon & Garfunkel", "Hall & Oates", "Pet Shop Boys", "Eurythmics"] },
            { connection: "BANDS WITH BODY PARTS IN THEIR NAMES", cards: ["Talking Heads", "The Flaming Lips", "Nine Inch Nails", "Bad Brains"] }
        ]
    },
    {
        id: 18,
        title: "Puzzle 018",
        difficulty: "easy",
        groups: [
            { connection: "PRINCE SONGS", cards: ["Purple Rain", "Kiss", "1999", "When Doves Cry"] },
            { connection: "MADONNA SONGS", cards: ["Like a Prayer", "Vogue", "Material Girl", "Holiday"] },
            { connection: "FAMOUS FEMALE SOLO ARTISTS", cards: ["Kate Bush", "Joni Mitchell", "Patti Smith", "Carole King"] },
            { connection: "BANDS WITH WEATHER IN THEIR NAMES", cards: ["Weather Report", "The Lightning Seeds", "Snow Patrol", "Hurricane"] }
        ]
    },
    {
        id: 19,
        title: "Puzzle 019",
        difficulty: "easy",
        groups: [
            { connection: "THE ROLLING STONES ALBUMS", cards: ["Sticky Fingers", "Let It Bleed", "Beggars Banquet", "Some Girls"] },
            { connection: "BOB DYLAN SONGS", cards: ["Like a Rolling Stone", "Blowin' in the Wind", "Tangled Up in Blue", "Subterranean Homesick Blues"] },
            { connection: "FAMOUS MUSIC PRODUCERS", cards: ["George Martin", "Quincy Jones", "Phil Spector", "Brian Eno"] },
            { connection: "BANDS WITH ROYALTY IN THEIR NAMES", cards: ["Queen", "King Crimson", "Queens of the Stone Age", "Kings of Leon"] }
        ]
    },
    {
        id: 20,
        title: "Puzzle 020",
        difficulty: "easy",
        groups: [
            { connection: "DEPECHE MODE SONGS", cards: ["Enjoy the Silence", "Personal Jesus", "People Are People", "Just Can't Get Enough"] },
            { connection: "DAVID BOWIE SONGS", cards: ["Changes", "Heroes", "Life on Mars?", "Rebel Rebel"] },
            { connection: "FAMOUS WOMEN IN BANDS", cards: ["Stevie Nicks", "Debbie Harry", "Tina Weymouth", "Christine McVie"] },
            { connection: "BANDS WITH GEOGRAPHIC DIRECTIONS IN THEIR NAMES", cards: ["East 17", "North Mississippi Allstars", "Westlife", "Southside Johnny and the Asbury Jukes"] }
        ]
    }
];
