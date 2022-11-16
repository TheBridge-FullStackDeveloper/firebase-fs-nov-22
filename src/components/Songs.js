import { Box, Button, Card, CardContent, TextField } from "@mui/material";
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
    <Box display="flex">
      <Box
        sx={{ width: 348, height: 289 }}
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
      >
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
      </Box>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: 32,
          listStyle: "none",
        }}
      >
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
    </Box>
  );
};

export default Songs;
