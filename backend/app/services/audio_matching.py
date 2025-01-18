import json
import random

def get_matching_music(classified_chunks):
    with open('backend/app/repository/data/processed_music_database.json', 'r') as file:
        music_database = json.load(file)
    
    music = []
    prev = None
    used_songs = set()  # Keep track of used songs to avoid repetition

    for chunk in classified_chunks:
        emotion = chunk['emotion']
        selected_song = None

        if prev:
            # Try to find a transition song
            transition_key = f"{prev}_to_{emotion}"
            transition_songs = music_database[prev]["transitions"].get(transition_key, [])
            
            # Filter out already used songs
            available_transitions = [
                song for song in transition_songs 
                if song["title"] not in used_songs
            ]
            
            if available_transitions:
                selected_song = random.choice(available_transitions)
            
        # If no transition song found or it's the first chunk
        if not selected_song:
            # Try to find a pure emotion song
            pure_songs = music_database[emotion]["pure"]
            available_pure = [
                song for song in pure_songs 
                if song["title"] not in used_songs
            ]
            
            # If all pure songs are used, reset the filter
            if not available_pure:
                available_pure = pure_songs
            
            selected_song = random.choice(available_pure)
        
        # Add selected song to results and mark as used
        music.append({
            "text": chunk["chunk"],
            "emotion": emotion,
            "music": selected_song["file_url"]
        })
        
        used_songs.add(selected_song["title"])
        prev = emotion
    
    return music

# Load from JSON
with open('backend/app/repository/data/sample_output_gemini.json', 'r', encoding='utf-8') as file:
    sample_output = json.load(file)

classified_chunks = sample_output["classified_chunks"]

# Now you can pass this to your function
result = get_matching_music(classified_chunks)

print(result)