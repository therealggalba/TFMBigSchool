import styles from './Message.module.scss';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  return (
    <div className={`${styles.messageWrapper} ${styles[role]}`}>
      <div className={`${styles.messageBubble} ${styles[role]}`}>
        {content}
      </div>
    </div>
  );
}
