import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentProps {
    content: string,
    onDeleteComment: (comment: string) => void 
}

export function Comment ({ content, onDeleteComment }:CommentProps){

    function handleDeleComment(){
        onDeleteComment(content)
    }

    const [likeCount, setLikeCount] = useState(0)

    function handleLikeComment(){
        setLikeCount((state) => {
            return state + 1
        })
    }
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/131715627?v=4" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header >  
                        <div className={styles.authorAndTime}>
                            <strong>Mateus Maia</strong>
                            <time title="6 de maio ás 15:54h" dateTime='2023-05-06 15:54:00'>Cerca de 1h atrás</time>
                        </div>
                        
                        <button onClick={handleDeleComment} title="Deletar comentário">
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
            
            <footer>
                <button onClick={handleLikeComment}>
                    <ThumbsUp />
                    Aplaudir <span >{likeCount}</span>
                </button>
            </footer>
            </div>

        </div>
    )
}