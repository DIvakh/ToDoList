export default interface Todo {
  todos: {
    id: number;
    text: string;
    completed: boolean;
  }[];
}
