import Theme from "./Theme";

interface Posts {
    id: number;
    title: string;
    text: string;
    theme?: Theme | null
}

export default Posts;