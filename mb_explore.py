from pathlib import Path

MB = Path(r"C:\Users\maria\Downloads\mbdump\mbdump")

def rows(filename):
    with open(MB / filename, "r", encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n").split("\t")


# --------------------------------------------------
# Load artist names
# --------------------------------------------------

artists = {}

print("Loading artists...")

for row in rows("artist"):
    artist_id = int(row[0])
    name = row[2]
    artists[artist_id] = name

print(f"Loaded {len(artists):,} artists.")


# --------------------------------------------------
# Load link -> link type
# --------------------------------------------------

links = {}

print("Loading links...")

for row in rows("link"):
    link_id = int(row[0])
    link_type_id = int(row[1])
    links[link_id] = link_type_id

print(f"Loaded {len(links):,} links.")


# --------------------------------------------------
# Load artist<->artist relationship types
# --------------------------------------------------

types = {}

for row in rows("link_type"):
    if len(row) < 8:
        continue

    type_id = int(row[0])
    entity0 = row[4]
    entity1 = row[5]
    name = row[6]

    if entity0 == "artist" and entity1 == "artist":
        types[type_id] = name


print("\nArtist ↔ Artist relationship types:\n")

for type_id, name in sorted(types.items(), key=lambda x: x[1].lower()):
    print(f"{type_id:5}  {name}")

from collections import defaultdict

print("\nScanning band memberships...")

import sys

if len(sys.argv) < 2:
    print("\nUsage:")
    print('  python mb_explore.py "The Yardbirds"')
    print('  python mb_explore.py --artist "Eric Clapton"')
    raise SystemExit


# --------------------------------------------------
# Artist -> bands
# --------------------------------------------------

if sys.argv[1] == "--artist":

    if len(sys.argv) < 3:
        print('Usage: python mb_explore.py --artist "Eric Clapton"')
        raise SystemExit

    search_name = sys.argv[2].casefold()

    matches = [
        (artist_id, name)
        for artist_id, name in artists.items()
        if name.casefold() == search_name
    ]

    if not matches:
        print(f'\nNo exact artist match for "{sys.argv[2]}".')
        raise SystemExit

    for target_id, target_name in matches:

        bands = []

        for row in rows("l_artist_artist"):
            link_id = int(row[1])

            if links.get(link_id) != 103:
                continue

            member_id = int(row[2])
            band_id = int(row[3])

            if member_id == target_id:
                bands.append(artists.get(band_id, f"#{band_id}"))

        print(f"\n=== {target_name} ===")
        print("\nMember of:")

        for name in sorted(set(bands)):
            print(f"  • {name}")

        if not bands:
            print("  No band memberships found.")


# --------------------------------------------------
# Band -> members
# --------------------------------------------------

else:

    search_name = sys.argv[1].casefold()

    matches = [
        (artist_id, name)
        for artist_id, name in artists.items()
        if name.casefold() == search_name
    ]

    if not matches:
        print(f'\nNo exact artist match for "{sys.argv[1]}".')
        raise SystemExit

    for target_id, target_name in matches:

        members = []

        for row in rows("l_artist_artist"):
            link_id = int(row[1])

            if links.get(link_id) != 103:
                continue

            member_id = int(row[2])
            band_id = int(row[3])

            if band_id == target_id:
                members.append(
                    artists.get(member_id, f"#{member_id}")
                )

        print(f"\n=== {target_name} ===")
        print("\nMembers:")

        for name in sorted(set(members)):
            print(f"  • {name}")

        if not members:
            print("  No members found.")