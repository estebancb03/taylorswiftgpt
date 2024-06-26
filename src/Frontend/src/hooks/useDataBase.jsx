import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import axiosClient from '../config/axiosClient';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

import dataBaseContext from '../context/DataBaseContext/dataBaseContext';
import { CHATS, LOADING, COLLECTION, CURRENT_CHAT } from '../types';

const useDataBase = () => {

  const DataBaseContext = useContext(dataBaseContext);
  const {
    chats,
    loading,
    _collection,
    currentChat,
    temperature,
    setDataBaseContextState
  } = DataBaseContext;

  const handleChats = async (id) => {
    let _chats = [];
    const querySnapshot = await getCollectionData(id);
    querySnapshot.forEach(doc => _chats.push({ ...doc.data(), id: doc.id }));
    setDataBaseContextState(CHATS, _chats);
  };

  const addChat = (name) => {
    const newChats = [...chats];
    const newChat = {
      id: uuidv4(),
      name: name ? name.slice(0, 26) : 'New chat',
      questions: []
    };
    newChats.push(newChat);
    setDataBaseContextState(CHATS, newChats);
    setDataBaseContextState(CURRENT_CHAT, newChat);
    document.title = name ? name.slice(0, 26) : 'New chat';
    return newChat;
  };

  const addQuestion = async (chatId, content) => {
    const questionId = uuidv4();
    const newChats = [...chats];
    setDataBaseContextState(LOADING, true);
    const newQuestion = {
      id: questionId,
      content,
      answer: await getSong(content)
    };
    await setTimeout(() => {
      setDataBaseContextState(LOADING, false);
    }, 1000);
    if (currentChat === null) {
      document.title = content.slice(0, 26);
      const newChat = addChat(content);
      await setTimeout(() => {
        newChat.questions.push(newQuestion);
      }, 100);
      newChats.push(newChat);
      newChats.map(chat => {
        if (chat.id == chatId) {
          chat.questions = newChat.questions;
        }
      });
      const chatAddedDoc = doc(firestore, _collection, newChat.id);
      await setDoc(chatAddedDoc, newChat);
    } else {
      const _doc = doc(firestore, _collection, chatId);
      const newChat = newChats.filter(chat => chat.id == chatId)[0];
      newChat.questions.push(newQuestion);
      newChats.map(chat => {
        if (chat.id == chatId) {
          chat.questions = newChat.questions;
        }
      });
      if (currentChat.questions.length === 1) {
        await setDoc(_doc, newChat);
        await renameChat(currentChat.id, content);
      } else {
        await updateDoc(_doc, newChat);
      }
    }
  };

  const changeCurrentChat = (chat) => {
    if (currentChat && currentChat.questions.length === 0) {
      deleteChat(currentChat.id);
    }
    setDataBaseContextState(CURRENT_CHAT, chat);
    document.title = chat.name;
  };

  const deleteChat = async (id) => {
    const newChats = chats.filter(chat => chat.id !== id);
    if (currentChat && id === currentChat.id) {
      setDataBaseContextState(CURRENT_CHAT, null);
    }
    setDataBaseContextState(CHATS, newChats);
    await deleteDoc(doc(firestore, _collection, id));
  };

  const renameChat = async (id, newName) => {
    if (newName !== '') {
      const newChats = [...chats];
      const modifiedChat = chats.filter(chat => chat.id == id)[0];
      modifiedChat.name = newName.slice(0, 26);
      newChats.map(chat => {
        if (chat.id == id) {
          chat = modifiedChat;
        }
      });
      setDataBaseContextState(CHATS, newChats);
      const _doc = doc(firestore, _collection, id);
      await updateDoc(_doc, modifiedChat);
    }
  };

  const getCollectionData = async (id) => {
    const dataCollection = collection(firestore, id);
    setDataBaseContextState(COLLECTION, id);
    const querySnapshot = await getDocs(dataCollection);
    return querySnapshot;
  };

  const getSong = async (question) => {
    try {
      const url = '/taylorswift/generateSong';
      const config = {
        model: 'taylor_swift',
        messages: [{ start_string: question }],
        temperature: parseFloat(temperature)
      };
      const { data } = await axiosClient.post(url, { config });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    DataBaseContext,
    handleChats,
    addChat,
    addQuestion,
    changeCurrentChat,
    deleteChat,
    renameChat
  };
};

export default useDataBase;
