import {useEffect, useRef, useState} from 'react';
import socketIOClient from 'socket.io-client';
import {SOCKET_SERVER_URL} from '../../Config/Config';
import axios from 'axios';
import LocalStorage from '../Helpers/LocalStorage';


const USER_JOIN_CHAT_EVENT = 'USER_JOIN_CHAT_EVENT';
const USER_LEAVE_CHAT_EVENT = 'USER_LEAVE_CHAT_EVENT';
const NEW_CHAT_MESSAGE_EVENT = 'NEW_CHAT_MESSAGE_EVENT';

const useChat = (roomId) => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState();
    const listRef = useRef(null);
    const socketRef = useRef();

    useEffect(() => {
        const user = LocalStorage.getItem('user', '');
        if (user) {
            setUser({
                name: user.name,
                picture: user.picture,
                roomNumber: user.roomNumber,
            });
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(
                `${SOCKET_SERVER_URL}/chats/${roomId}/users`
            );
            const result = response.data.users;
            setUsers(result);
        };

        fetchUsers();
    }, [roomId]);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(
                `${SOCKET_SERVER_URL}/chats/${roomId}/messages`
            );
            const result = response.data.messages;
            setMessages(result);
            // Scroll to bottom
            if (listRef.current) {
                listRef.current.scroll(0, listRef.current.scrollHeight);
            }
        };

        fetchMessages();
    }, [roomId]);

    useEffect(() => {
        if (!user) {
            return;
        }
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, name: user.name, picture: user.picture, roomNumber: user.roomNumber, action: '' },
        });

        socketRef.current.on('connect', () => {
            console.log(socketRef.current.id);
        });

        socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
            if (user.id === socketRef.current.id) return;
            setUsers((users) => [...users, user]);
        });

        socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
            setUsers((users) => users.filter((u) => u.id !== user.id));
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
            // Scroll to bottom
            if (listRef.current) {
                listRef.current.scroll(0, listRef.current.scrollHeight);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId, user]);

    const sendMessage = (messageBody) => {
        if (!socketRef.current) return;
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            user: user,
            createdAt: Date.now(),
        });
    };

    return {
        messages,
        sendMessage,
        listRef,
    };
};

export default useChat;