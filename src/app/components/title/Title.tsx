import styles from './styles.module.scss'
interface ITitleProps {
    title: string
}
export default function Title(props: ITitleProps) {

    return (
        <h1 className={styles.title}>
            {props.title}
        </h1>
    );
}
