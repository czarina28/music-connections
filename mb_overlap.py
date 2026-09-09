from pathlib import Path
from collections import defaultdict

MB = Path(r"C:\Users\maria\Downloads\mbdump\mbdump")

MEMBER_OF_BAND = 103


def rows(filename):
    with open(MB / filename, "r", encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n").split("\t")


# --------------------------------------------------
# Artists
# --------------------------------------------------

print("Loading artists...")

artists = {}

for row in rows("artist"):
    artist_id = int(row[0])
    artists[artist_id] = row[2]

print(f"Loaded {len(artists):,} artists.")


# --------------------------------------------------
# Links
# --------------------------------------------------

print("Loading links...")

links = {}

for row in rows("link"):
    link_id = int(row[0])
    link_type_id = int(row[1])
    links[link_id] = link_type_id

print(f"Loaded {len(links):,} links.")


# --------------------------------------------------
# Membership graph
# --------------------------------------------------

print("Scanning band memberships...")

artist_to_bands = defaultdict(set)
band_to_artists = defaultdict(set)

for row in rows("l_artist_artist"):

    link_id = int(row[1])

    if links.get(link_id) != MEMBER_OF_BAND:
        continue

    artist_id = int(row[2])
    band_id = int(row[3])

    artist_to_bands[artist_id].add(band_id)
    band_to_artists[band_id].add(artist_id)


print(
    f"Found {len(artist_to_bands):,} artists "
    "with band memberships."
)


# --------------------------------------------------
# Score interesting artists
# --------------------------------------------------

# --------------------------------------------------
# Find overlaps among recognizable bands
# --------------------------------------------------

TARGET_BANDS = {
    "The Yardbirds",
    "Led Zeppelin",
    "Cream",
    "Blind Faith",
    "John Mayall & the Bluesbreakers",
    "The Velvet Underground",
    "Roxy Music",
    "King Crimson",
    "The Stooges",
    "The Replacements",
    "Foo Fighters",
    "Guns N’ Roses",
    "DEVO",
    "Sonic Youth",
    "Minutemen",
    "fIREHOSE",
    "The Police",
    "Talking Heads",
    "Fleetwood Mac",
    "The Byrds",
}

target_band_ids = {
    artist_id
    for artist_id, name in artists.items()
    if name in TARGET_BANDS
}

print(
    f"\nFound {len(target_band_ids)} "
    f"of {len(TARGET_BANDS)} target bands."
)

candidates = []

for artist_id, band_ids in artist_to_bands.items():

    matches = band_ids & target_band_ids

    if len(matches) >= 2:
        candidates.append(
            (
                len(matches),
                artist_id,
                matches
            )
        )

candidates.sort(reverse=True)


print("\n=== PUZZLE TROUBLEMAKERS ===\n")

for score, artist_id, band_ids in candidates:

    artist_name = artists.get(artist_id, "?")

    band_names = sorted(
        artists.get(band_id, "?")
        for band_id in band_ids
    )

    print(
        f"{artist_name}: "
        + " | ".join(band_names)
    )


# --------------------------------------------------
# Output
# --------------------------------------------------

print("\nPotential puzzle troublemakers:\n")

shown = 0

for score, artist_id, band_ids in candidates:

    artist_name = artists.get(artist_id, "?")

    band_names = sorted(
        artists.get(band_id, "?")
        for band_id in band_ids
    )

    print(
        f"{artist_name} "
        f"({score} useful memberships)"
    )

    print(
        "   " + " | ".join(band_names)
    )

    print()

    shown += 1

    if shown >= 100:
        break