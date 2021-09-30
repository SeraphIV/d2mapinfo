'use strict';

let forward = {
    'Rogue Encampment': ['Blood Moor'],
    'Blood Moor': ['Den of Evil', 'Cold Plains'],
    'Den of Evil': [],
    'Cold Plains': ['Burial Grounds', 'Cave', 'Stony Field'],
    'Burial Grounds': ['Crypt', 'Mausoleum'],
    'Cave': [],
    'Stony Field': ['Tristam', 'Underground Passage 1'],
    'Underground Passage 1': ['Underground Passage 2', 'Dark Wood'],
    'Dark Wood': ['Black Marsh'],
    'Black Marsh': ['Hole 1', 'Tower', 'Tamoe Highland'],
    'Hole 1': ['Hole 2'],
    'Tamoe Highland': ['Pit 1', 'Monastary Gate'],
    'Pit 1': ['Pit 2'],
    'Monastary Gate': ['Outer Cloister'],
    'Outer Cloister': ['Barracks'],
    'Barracks': ['Jail 1'],
    'Jail 1': ['Jail 2'],
    'Jail 2': ['Jail 3'],
    'Jail 3': ['Inner Cloister'],
    'Inner Cloister': ['Cathedral'],
    'Cathedral': ['Catacombs 1'],
    'Catacombs 1': ['Catacombs 2'],
    'Catacombs 2': ['Catacombs 3'],
    'Catacombs 3': ['Catacombs 4'],
}

let reverse = {}

for (const [src, dests] of Object.entries(forward)) {
    console.log(src, dests);
    for(const dest of dests) {
        if(reverse[dest]) {
            reverse[dest].push(src);
        }
        else {
            reverse[dest] = [src];
        }
    }
}

let mapNotes = {};

mapNotes["Cold Plains"] = ["exit to Burial Grounds is always in a corner", "exit to Stony Field is always in a center"]
mapNotes["Stony Field"] = ["Cairn stones are by the path"]
mapNotes["Underground Passage 1"] = ["UP2: left of the way you came in LOTWYCI", "Exit tile: straight across"]
mapNotes["Dark Wood"] = ["Follow the path to find the Black Marsh"]
mapNotes["Black Marsh"] = ["Path will split, one branch take you to the hole, other to Tamoe Highland"]
mapNotes["Tower"] = ["LOTWYCI"]
mapNotes["Tamoe Highland"] = ["Always go straight to the top right"]
mapNotes["Outer Cloister"] = ["WP on the Left, go right", "Cross Shape in the middle, go straight", "WP on the right, go left"]
mapNotes["Barracks"] = ["Either LOTWYCI or straight - one will go to Hammer, one will go to Jail 1"]
mapNotes["Jail 1"] = ["Straight across to level 2"]
mapNotes["Jail 2"] = ["Straight across to level 3"]
mapNotes["Jail 3"] = ["LOTWYCI to Inner Cloister"]
mapNotes["Inner Cloister"] = ["?"]
mapNotes["Cathedral"] = ["?"]
mapNotes["Catacombs 1"] = ["random woo~"]
mapNotes["Catacombs 2"] = ["WP: move counterclockwise of entrance in a tight circle", "Exit: right of the WP"]
mapNotes["Catacombs 3"] = ["random"]

$(main)

function main() {
    loadMap('Blood Moor');
}

function loadMap(map) {

    let children = forward[map];
    let parents = reverse[map];
    let notes = mapNotes[map];
    
    $('#location').text(map);

    $('#children-list').empty();

    if(children) {
        for(const child of children) {
            $('#children-list').append(`<li><a href="#">${child}</a></li>`);
        }

        $("#children-list a").click(mapNameClicked);

        $('#children').show();
        $('#no-children').hide();
    }
    else {
        $('#children').hide();
        $('#no-children').show();
    }

    $('#parents-list').empty();

    if(parents) {
        for(const parent of parents) {
            $('#parents-list').append(`<li><a href="#">${parent}</a></li>`);
        }

        $("#parents-list a").click(mapNameClicked);

        $('#parents').show();
        $('#no-parents').hide();
    }
    else {
        $('#parents').hide();
        $('#no-parents').show();
    }

    $('#notes-list').empty();

    if(notes) {
        for(const note of notes) {
            $('#notes-list').append(`<li>${note}</li>`);
        }

        $('#notes').show();
        $('#no-notes').hide();
    }
    else {
        $('#notes').hide();
        $('#no-notes').show();
    }


}

function mapNameClicked() {
    let mapName = $(this).text();

    loadMap(mapName);
}