import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { getFirestore } from "firebase/firestore";
  import { firebaseApp } from "../firebase-config";
  import { getSpecificVideo, updateVideo, deleteVideo } from "../utils/fetchData";
  import Spinner from "../Components/Spinner";
  import ReactPlayer from "react-player";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  
  const uploadNewVideo = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Can implement progress tracking here if needed
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  
  const UpdateVideo = () => {
    const { videoId } = useParams();
    const firestoreDb = getFirestore(firebaseApp);
    const navigate = useNavigate();
    const toast = useToast();
  
    const [videoInfo, setVideoInfo] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [newVideoFile, setNewVideoFile] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      getSpecificVideo(firestoreDb, videoId).then((data) => {
        setVideoInfo(data);
        setTitle(data.title);
        setDescription(data.description);
        setLoading(false);
      });
    }, [videoId, firestoreDb]);
  
    const handleUpdate = async () => {
      setLoading(true);
      try {
        let videoUrl = videoInfo.videoUrl;
        if (newVideoFile) {
          // Upload new video file to your storage and get the new video URL
          videoUrl = await uploadNewVideo(newVideoFile);
        }
  
        await updateVideo(firestoreDb, videoId, { title, description, videoUrl });
        toast({
          title: "Video updated.",
          description: "Your video has been updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate(`/videoDetail/${videoId}`);
      } catch (error) {
        toast({
          title: "Error updating video.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
  
    
  
    const handleFileChange = (e) => {
      setNewVideoFile(e.target.files[0]);
    };
  
    if (loading) return <Spinner />;
  
    return (
      <Flex
        width={"full"}
        height="auto"
        justifyContent={"center"}
        alignItems="center"
        direction={"column"}
        py={4}
        px={6}
      >
        <Box width={"full"} maxWidth="600px" p={4} borderWidth={1} borderRadius="md">
          <FormControl id="title" mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          {videoInfo && videoInfo.videoUrl && (
            <Box mb={4}>
              <ReactPlayer
                url={videoInfo.videoUrl}
                width="100%"
                controls={true}
              />
            </Box>
          )}
          <FormControl id="newVideo" mb={4}>
            <FormLabel>Upload New Video</FormLabel>
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
          </FormControl>
          <Flex justifyContent={"space-between"}>
            
            <Button
              colorScheme="blue"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default UpdateVideo;
  