import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
    name: string,
    role: string,
    avatarUrl: string,
}


interface Content {
    type: 'paragraph' | 'link',
    content: string,    
}

interface postProps {
    author: Author,
    publishedAt: Date,
    content: Content[], 
}

export function Post ({author, publishedAt, content}:postProps) {

    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
    ])
    const [newCommentText, setNewCommentText]= useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' MMMM 'ás' HH:mm'h'", {
        locale: ptBR,
    } )

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleCreateNewComment (event: FormEvent){
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value)
    }

    function deleteComment (commentToDelete: string){
        const commentsWhitoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWhitoutDeletedOne);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obirgatório')
    }

    const isNewCommentEmpty = newCommentText.length == 0

    return(
        <article className={styles.post}>
            <header>
            <div className={styles.author}>
                <Avatar hasBorder src={author.avatarUrl}/>
                <div className={styles.authorInfo}>
                    <strong>{author.name}</strong>
                    <small>{author.role}</small>
                </div>
            </div>

            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                {publishedDateRelativeToNow}
            </time>
            </header>

            <div className={styles.content}> 
                {content.map(line => {
                    if(line.type == 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    }else if (line.type == 'link'){
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder='Deixe seu comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
                

            </form>

            <div className={styles.commentList}>
               {comments.map(comment => {
                return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
               })}
            </div>
        </article>
        
    )
}