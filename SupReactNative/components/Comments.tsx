import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { retrieveToken } from '../security/token_handling';
import { getUser } from './getUser';
import { formatDate } from '../components/formatDate';

interface Comment {
    id: number;
    activity_id: number;
    user_id: string;
    comment: string;
    created_at: string;
    username: string;
}


interface CommentsProps {
    activityId: number;
}



const Comments: React.FC<CommentsProps> = ({ activityId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    console.log("Activity id inne i Comments", activityId);

    useEffect(() => {
        async function fetchComments() {
            console.log("activity id inni fetch ocmments:", activityId)
            const response = await fetch(`http://152.94.160.72:3000/activity/${activityId}/comments`);
            if (!response.ok) {
                throw new Error(`Failed to fetch comments for activity ${activityId}. Server responded with ${response.status}.`);
            }
            const data = await response.json();
            setComments(data);
        }
        fetchComments();
    }, [activityId]);

    async function handleAddComment() {
        try {
            const user = await getUser()
            console.log("er her inne i handleAddComment")
            const myToken = retrieveToken();

            console.log("New comment:", newComment);
            console.log("Activity id inne i handleAddComment", activityId);

            const response = await fetch(`http://152.94.160.72:3000/activity/${activityId}/comments`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${myToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activity_id: activityId,
                    userId: user.user.id,
                    comment: newComment,
                })
            });

            console.log("Respones: ", response);

            if (!response.ok) {
                throw new Error(`Failed to handle comment successfully ${response.status}`);
            }

            //add new comment to the comments array
            const newCommentData = await response.json();
            console.log('new comment: ', newCommentData);
            setComments([...comments, newCommentData]);
            setNewComment('');
        } catch (error) {
            console.error("Error in comments", error);
        }
    }




    return (
        <View>
            <View style={styles.commentFrame}>
                {comments.map(comment => (
                    <View key={comment.id} style={styles.commentContainer}>
                        <Text style={styles.commentDate}>{formatDate(comment.created_at)}</Text>
                        <Text style={styles.commentText}>{comment.user_id + ":\n"}<Text style={{ fontWeight: 'normal' }}>{comment.comment}</Text></Text>
                    </View>
                ))}
            </View>
            <TextInput
                style={styles.input}
                placeholder="Skriv en kommentar..."
                onChangeText={text => setNewComment(text)}
                value={newComment}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                <Text style={styles.buttonText}>Legg til kommentar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        width: '70%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EB7B31',
        borderRadius: 10,
        margin: 12,
        height: 40,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    commentContainer: {
        backgroundColor: '#FFF3E6',
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        marginTop: 10,
        width: "90%",
        alignSelf: 'center',
    },
    commentText: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    commentDate: {
        color: '#A5A5A5',
        fontSize: 12,
    },
    commentFrame: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 10,
        marginBottom: 10,
        width: "85%",
    }
});




export default Comments;
