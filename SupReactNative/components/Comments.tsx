import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { retrieveToken } from '../security/token_handling';
import { getUser } from './getUser';
import { formatDate } from '../components/formatDate';

interface Comment {
    id: number;
    activity_id: number;
    user_id: string;
    comment: string;
    created_at: string;
    user_first_name: string;

}

interface CommentsProps {
    activityId: number;
}


const Comments: React.FC<CommentsProps> = ({ activityId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [currentUserId, setCurrentUserId] = useState(String);

    console.log("Activity id inne i Comments", activityId);


    useEffect(() => {
        async function fetchComments() {
            const user = await getUser()
            setCurrentUserId(user.user.id);
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
            const myToken = retrieveToken();
            const response = await fetch(`http://152.94.160.72:3000/activity/${activityId}/comments`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${myToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    activity_id: activityId,
                    userId: user.user.id,
                    userFirstName: user.user.first_name,
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

    async function handleDeleteComment(comment: Comment) {
        try {
            console.log('handleDeletecomment hehe');
            const myToken = retrieveToken();
            console.log('comment id= ', comment.id)
            Alert.alert(
                'Er du sikker på du vil slette denne kommentaren?',
                'Hvis du sletter denne kommentaren, kan du ikke angre',
                [
                { text: 'Avbryt', style: 'cancel'},
                {
                    text: 'Slett',
                    onPress: async () => {
                        const response = await fetch(`http://152.94.160.72:3000/activity/${comment.id}/comments`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${myToken}`,
                            },
                        });
                        if (!response.ok) {
                            throw new Error(`Failed to delete comment ${comment.id}. Server responded with ${response.status}.`);
                        }

                        //fjerne kommentar fra kommentar-arrayen
                        const updatedComments = Array.isArray(comments) ? comments.filter(c => c.id !== comment.id) : [];
                        setComments(updatedComments);

                    },
                },
            

            ],
            { cancelable: false }
                

            );      
            
        } catch (error) {
        console.error("Error blablaba in handleDeleteComments", error);
    }

}


return (
    <View>
        <View style={styles.commentFrame}>
            {comments.map(comment => (
                <View key={comment.id} style={styles.commentContainer}>
                    {(comment.user_id) === currentUserId && (
                        <TouchableWithoutFeedback onPress={() => handleDeleteComment(comment)}>
                            <View style={styles.deleteButton}>
                                <Text style={styles.deleteText}>[X]</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.commentDate}>{formatDate(comment.created_at)}</Text>
                    <Text style={styles.commentText}>{comment.user_first_name + ":\n"}<Text style={{ fontWeight: 'normal' }}>{comment.comment} </Text></Text>

                </View>
            ))}
        </View>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Skriv en kommentar..."
                value={newComment}
                onChangeText={text => setNewComment(text)}
                multiline={true}
                style={[styles.input, { maxHeight: 300 }]}
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
            <Text style={styles.buttonText}>Legg til kommentar</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        color: 'grey'
    },
    inputContainer: {
        borderRadius: 10,
        paddingLeft: 15,
        marginTop: 0,
        borderWidth: 1,
        borderColor: 'grey',
        width: '85%',
        height: 80,
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
    },
    deleteButton: {
        fontWeight: 'bold',
    },

    deleteText: {
        color: 'red'
    }

});




export default Comments;
