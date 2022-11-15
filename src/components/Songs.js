import { Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import db from "../services/firestore";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({});

  const onChange = (e) => {
    setNewSong((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSongs = () => {
    db.collection("songs")
      .get()
      .then((querySnapshot) => {
        setSongs([]);
        querySnapshot.forEach((song) => {
          setSongs((prev) => [...prev, { ...song.data(), id: song.id }]);
        });
      });
  };

  const createSong = () => {
    db.collection("songs")
      .add(newSong)
      .then(() => {
        fetchSongs();
      });
  };

  const updateSong = (id) => {
    db.collection("songs")
      .doc(id)
      .update(newSong)
      .then(() => {
        fetchSongs();
      });
  };

  const removeSong = (id) => {
    db.collection("songs")
      .doc(id)
      .delete()
      .then(() => {
        fetchSongs();
      });
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <TextField
        onChange={onChange}
        id="outlined-basic"
        label="title"
        variant="outlined"
        name="title"
      />
      <TextField
        onChange={onChange}
        id="outlined-basic"
        label="artist"
        variant="outlined"
        name="artist"
      />
      <TextField
        onChange={onChange}
        id="outlined-basic"
        label="year"
        type="number"
        variant="outlined"
        name="year"
      />

      <Button onClick={createSong}>Create</Button>
      <ul style={{ display: "flex", justifyContent: "space-around"}}>
        {songs.map((song, i) => (
          <Card key={i} style={{ padding: 14, maxWidth: 200 }}>
            <CardContent>
              <li>title: {song.title}</li>
              <li>year: {song.year || "Year not available"}</li>
              <li>artist: {song.artist || "Artist not available"}</li>
              <Button
                onClick={() => {
                  updateSong(song.id);
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  removeSong(song.id);
                }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Songs;
