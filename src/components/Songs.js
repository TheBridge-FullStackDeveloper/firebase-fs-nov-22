import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import db from "../services/firestore";
import Upload from "./Upload";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({});

  const onChange = (e) => {
    setNewSong((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setImgUrl = (imgUrl) => {
    setNewSong({ ...newSong, imgUrl });
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
        <Upload onUploadFinished={setImgUrl} />
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
              <img
                src={
                  song.imgUrl ||
                  "data:image/jpeg;base64,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"
                }
                alt="img_song"
              />
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
