import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key";

export default function useRecordingsList(audio) {
  // const [recordings, setRecordings] = useState([]);
  const [recordings, setRecordings] = useState();

  useEffect(() => {
    if (audio){
      // setRecordings((prevState) => {
      //   return [...prevState, { key: generateKey(), audio }];
      // });
      // setRecordings({ key: generateKey(), audio })
      setRecordings(audio)
    }
    else {
      setRecordings()
    }
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
  };
}
