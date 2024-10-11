export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    cover_image: string;
    profile_pic: string;
    profession: string;
    bio: string;
    phone_number: string;
    website: string;
    skills: string;
    resume: string;
    location: string;
    last_login: string;
}

export interface UserData {
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    skills?: string; // Chaîne de caractères, les compétences séparées par des virgules
    profession: string;
    phone_number: string;
    website: string;
    location: string;
    resume: string;
    cover_image: string;
    profile_pic: string;
  }