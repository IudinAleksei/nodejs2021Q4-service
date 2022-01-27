export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  columnId: string | null;

  userId: string | null;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
