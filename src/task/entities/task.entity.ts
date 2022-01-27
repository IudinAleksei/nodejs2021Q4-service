export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  columnId: string;

  userId: string;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
