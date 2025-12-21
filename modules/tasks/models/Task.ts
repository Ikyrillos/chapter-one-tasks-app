export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  // for sorting by date purpose
  createdAt: number;
}