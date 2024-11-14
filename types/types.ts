export interface Guardian {
  name: string;
  email: string;
  phone: string | null; // Making phone optional in case it’s not always provided
}

export interface Student {
  name: string;
  studentId: string;
  email: string;
  phone: string | null; // Making phone optional
  address: string;
  fee_amount: string; // If this represents a monetary value
  fee_due_date: string | null; // Nullable if there’s no specific due date
  guardian: Guardian | null;
  subjects: Subject[];
}

export interface Subject {
  _id: string;
  name: string;
  grade: string;
  teachers: Teacher[]; // Array of teachers linked to the subject
  students: Student[] | null; // Nullable in case no students are linked
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone: string | null; // Making phone optional
  subjects: Subject[]; // Using `Subject[]` for array notation
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  assignedTo: Teacher;
}
