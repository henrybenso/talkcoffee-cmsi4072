export default function Profile({
  userData,
}: {
  userData: {
    id: string;
    email: string;
    username: string;
    hashedPassword: string;
    firstName: string;
    lastName: string;
    age: number;
    role: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
  };
}) {}
